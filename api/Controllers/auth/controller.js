const BaseController = require("../../Global/controller");
const { Response } = require("../../Helpers/Response");
const Sequelize = require("sequelize");
const { createJWT, autoIncrementId } = require("../../Helpers/Utils");
const sequelize = require("../../SequelizeConfig");
const DBSequelize = require("../../Global/DBSequelizeConfig");
const md5 = require("md5");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

class authController extends BaseController {
    constructor() {
        super();
    }

    async createUser(req, res) {
        try {
            const { userProfileName, DOB, userEmail, userPhone, userPassword, roleID } = req.body;
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(userPassword, salt);
            var obj = req.body;
            var newObj = {};
            var missing = {};
            Object.keys(obj).forEach(function (key) {
                if (obj[key] !== null && obj[key] !== "") {
                    newObj[key] = obj[key];
                } else {
                    missing[key] = obj[key];
                }
            });
            if (Object.keys(missing).length != 0) {
                return Response(res)({
                    message: "Missing values",
                    statusCode: 400,
                    response: { missingKeys: missing }
                });
            } else {
                const checkQry = `SELECT * FROM users WHERE userEmail = '${userEmail}' AND isDeleted = 0`;
                const checkRes = await DBSequelize.query(checkQry, { type: Sequelize.QueryTypes.SELECT });
                if (checkRes.length > 0) {
                    return Response(res)({
                        message: "Email already registered!",
                        statusCode: 400,
                        response: {}
                    });
                } else {
                    const insertQry = `
                    INSERT INTO users( userProfileName, DOB, userEmail,
                        userPhone, userPassword, roleID, isDeleted,addedAt, addedBy)
                        VALUES
                        ('${userProfileName}','${DOB}','${userEmail}',
                        '${userPhone}','${hashPassword}','${roleID}',0,1,1)`;
                    const result = await DBSequelize.query(insertQry, {
                        type: Sequelize.QueryTypes.INSERT
                    });
                    return Response(res)({
                        message: "User created successfully!",
                        statusCode: 200,
                        response: { result }
                    });
                }
            }
        } catch (error) {
            return Response(res)({
                message: "Failed",
                statusCode: 400,
                response: { error }
            });
        }
    }

    async getRoles(req, res) {
        try {
            const getQry = `SELECT * FROM userroles`;
            const result = await DBSequelize.query(getQry, {
                type: Sequelize.QueryTypes.SELECT
            });
            return Response(res)({
                message: "Get successfully!",
                statusCode: 200,
                response: { result }
            });
        } catch (error) {
            return Response(res)({
                message: "Failed",
                statusCode: 400,
                response: { error }
            });
        }
    }

    async auth(req, res) {
        try {
            const { userEmail, userPassword } = req.body;
            var obj = req.body;
            var newObj = {};
            var missing = {};
            Object.keys(obj).forEach(function (key) {
                if (obj[key] !== null && obj[key] !== "") {
                    newObj[key] = obj[key];
                } else {
                    missing[key] = obj[key];
                }
            });
            if (Object.keys(missing).length != 0) {
                return Response(res)({
                    message: "Missing values",
                    statusCode: 400,
                    response: { missingKeys: missing }
                });
            } else {
                const getQry = `SELECT * FROM users WHERE userEmail = '${userEmail}' AND isDeleted = 0`;
                const result = await DBSequelize.query(getQry, {
                    type: Sequelize.QueryTypes.SELECT
                });
                if (result.length > 0) {
                    const match = await bcrypt.compare(userPassword, result[0].userPassword);
                    if (!match) {
                        return Response(res)({
                            message: "Invalid credentials. Please try again!",
                            statusCode: 401,
                            response: {}
                        });
                    } else {
                        var token = createJWT(result);
                        const insertToken = `UPDATE users SET refreshToken = '${token}' WHERE userEmail = '${userEmail}'`;
                        const resultToken = await DBSequelize.query(insertToken, {
                            type: Sequelize.QueryTypes.UPDATE
                        });
                        const detail = {
                            userID: result[0].userId,
                            userProfileName: result[0].userProfileName,
                            userDOB: result[0].DOB,
                            userEmail: result[0].userEmail,
                            userPhone: result[0].userPhone
                        };
                        return Response(res)({
                            message: "Login successfully!",
                            statusCode: 200,
                            response: {
                                detail: detail,
                                userRole: result[0].roleID,
                                token
                            }
                        });
                    }
                } else {
                    return Response(res)({
                        message: "Invalid Email. Please try again!",
                        statusCode: 401,
                        response: {}
                    });
                }
            }
        } catch (error) {
            return Response(res)({
                message: "Failed",
                statusCode: 400,
                response: { error }
            });
        }
    }

    async forgotPassword(req, res) {
        const { userEmail } = req.body;
        try {
            const getQry = `SELECT * from users WHERE userEmail = '${userEmail}'`;
            const getRes = await DBSequelize.query(getQry, {
                type: Sequelize.QueryTypes.SELECT
            });
            if (getRes.length > 0) {
                var code = Math.random().toString(10).substr(2, 6);

                const result = BaseController.sendHTMLMail({
                    to: userEmail,
                    subject: "Password reset Survey",
                    text: code,
                    html: `<h1 style='text-align:center'>Password reset code '${code}'</h1>`
                });

                const insertRecoveryQry = `UPDATE users SET recoveryKey = '${code}' WHERE userEmail = '${userEmail}'`;
                const insertRecoveryRes = await DBSequelize.query(insertRecoveryQry, {
                    type: Sequelize.QueryTypes.UPDATE
                });

                return Response(res)({
                    message: "Email sent",
                    statusCode: 200,
                    response: { result }
                });
            } else {
                return Response(res)({
                    message: "Invalid Email. Please try again!",
                    statusCode: 401,
                    response: {}
                });
            }
        } catch (error) {
            return Response(res)({
                message: "Failed",
                statusCode: 400,
                response: { error }
            });
        }
    }

    async getUserByTypes(req, res) {
        const { roleID } = req.params;
        try {
            const getQry = `SELECT * FROM users where roleID = '${roleID}' AND isDeleted = 0`;
            const result = await DBSequelize.query(getQry, { type: Sequelize.QueryTypes.SELECT });
            return Response(res)({
                message: "Get successfully!",
                statusCode: 200,
                response: { result }
            });
        } catch (error) {
            return Response(res)({
                message: "Failed",
                statusCode: 400,
                response: { error }
            });
        }
    }

    async getUserByID(req, res) {
        const { userId } = req.params;
        try {
            const getQry = `SELECT * FROM users WHERE userId = '${userId}' AND isDeleted = 0`;
            const [_obj] = await DBSequelize.query(getQry, { type: Sequelize.QueryTypes.SELECT });
            return Response(res)({
                message: "Get successfully!",
                statusCode: 200,
                response: { result: _obj }
            });
        } catch (error) {
            return Response(res)({
                message: "Failed",
                statusCode: 400,
                response: { error }
            });
        }
    }

    async deleteUser(req, res) {
        const { userId } = req.params;
        try {
            const getQry = `UPDATE users SET isDeleted = 1 WHERE userId = '${userId}'`;
            const result = await DBSequelize.query(getQry, { type: Sequelize.QueryTypes.UPDATE });
            return Response(res)({
                message: "Deleted successfully!",
                statusCode: 200,
                response: { result }
            });
        } catch (error) {
            return Response(res)({
                message: "Failed",
                statusCode: 400,
                response: { error }
            });
        }
    }
}

module.exports = new authController();

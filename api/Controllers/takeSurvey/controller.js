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

class SurveyController extends BaseController {
    constructor() {
        super();
    }

    async createTakeSurvey(req, res) {
        const { data } = req.body;
        try {
            const getQry = `SELECT * FROM survey WHERE surveyID = '${data.surveyID}' AND isDeleted = 0`;
            const getRes = await DBSequelize.query(getQry, {
                type: Sequelize.QueryTypes.SELECT
            });
            if (getRes.length > 0) {
                const insertQry = `INSERT INTO takesurvey (surveyID, surveyName, adminID, userID) VALUES ('${data.surveyID}','${data.surveyName}','${data.adminID}','${data.userID}')`;
                const result = await DBSequelize.query(insertQry, {
                    type: Sequelize.QueryTypes.INSERT
                });

                var questions = data.questions;

                for (var i = 0; i < questions.length; i++) {
                    const insertDetailQry = `INSERT INTO takesurveydetail (surveyID, surveyQuestion, surveyAnswer) VALUES ('${data.surveyID}','${questions[i].question}','${questions[i].answer}')`;
                    const insertDetailRes = await DBSequelize.query(insertDetailQry, {
                        type: Sequelize.QueryTypes.INSERT
                    });
                }

                return Response(res)({
                    message: "Survey take successfully!",
                    statusCode: 200,
                    response: { result }
                });
            } else {
                return Response(res)({
                    message: "No Survey against this ID",
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

    async getTakeSurveyByID(req, res) {
        const { surveyID } = req.params;
        try {
            var data;
            const getSurveyQry = `SELECT surveyID, surveyName, adminID, userID FROM takesurvey WHERE surveyID = '${surveyID}' AND isDeleted = 0`;
            const getSurveyRes = await DBSequelize.query(getSurveyQry, {
                type: Sequelize.QueryTypes.SELECT
            });
            if (getSurveyRes.length > 0) {
                const getSurveyQuestionsQry = `SELECT surveyQuestion, surveyAnswer FROM takesurveydetail WHERE surveyID = '${surveyID}'`;
                const getSurveyQuestionsRes = await DBSequelize.query(getSurveyQuestionsQry, {
                    type: Sequelize.QueryTypes.SELECT
                });

                data = {
                    surveyID: getSurveyRes[0].surveyID,
                    surveyName: getSurveyRes[0].surveyName,
                    adminID: getSurveyRes[0].adminID,
                    userID: getSurveyRes[0].userID,
                    questions: getSurveyQuestionsRes
                };

                return Response(res)({
                    message: "Get Successfully",
                    statusCode: 200,
                    response: { data }
                });
            } else {
                return Response(res)({
                    message: "No Survey against this ID",
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

    async getTakeSurveys(req, res) {
        try {
            var data = [];
            const getSurveyQry = `SELECT surveyID, surveyName, adminID, userID FROM takesurvey WHERE isDeleted = 0`;
            const getSurveyRes = await DBSequelize.query(getSurveyQry, {
                type: Sequelize.QueryTypes.SELECT
            });

            for (var j = 0; j < getSurveyRes.length; j++) {
                const getSurveyQuestionsQry = `SELECT surveyQuestion, surveyAnswer FROM takesurveydetail WHERE surveyID = '${getSurveyRes[j].surveyID}'`;
                const getSurveyQuestionsRes = await DBSequelize.query(getSurveyQuestionsQry, {
                    type: Sequelize.QueryTypes.SELECT
                });

                data[j] = {
                    surveyID: getSurveyRes[j].surveyID,
                    surveyName: getSurveyRes[j].surveyName,
                    adminID: getSurveyRes[j].adminID,
                    userID: getSurveyRes[j].userID,
                    questions: getSurveyQuestionsRes
                };
            }

            return Response(res)({
                message: "Get Successfully",
                statusCode: 200,
                response: { data }
            });
        } catch (error) {
            return Response(res)({
                message: "Failed",
                statusCode: 400,
                response: { error }
            });
        }
    }

    async getTakeSurveysByAdmin(req, res) {
        const { adminID } = req.params;
        try {
            var data = [];
            const getSurveyQry = `SELECT surveyID, surveyName, adminID, userID FROM takesurvey WHERE adminID = '${adminID}' AND isDeleted = 0`;
            const getSurveyRes = await DBSequelize.query(getSurveyQry, {
                type: Sequelize.QueryTypes.SELECT
            });
            if (getSurveyRes.length > 0) {
                for (var j = 0; j < getSurveyRes.length; j++) {
                    const getSurveyQuestionsQry = `SELECT surveyQuestion, surveyAnswer FROM takesurveydetail WHERE surveyID = '${getSurveyRes[j].surveyID}'`;
                    const getSurveyQuestionsRes = await DBSequelize.query(getSurveyQuestionsQry, {
                        type: Sequelize.QueryTypes.SELECT
                    });

                    data[j] = {
                        surveyID: getSurveyRes[j].surveyID,
                        surveyName: getSurveyRes[j].surveyName,
                        adminID: getSurveyRes[j].adminID,
                        userID: getSurveyRes[j].userID,
                        questions: getSurveyQuestionsRes
                    };
                }

                return Response(res)({
                    message: "Get Successfully",
                    statusCode: 200,
                    response: { data }
                });
            } else {
                return Response(res)({
                    message: "No Survey against this Admin",
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

    async getTakeSurveysByUser(req, res) {
        const { userID } = req.params;
        try {
            var data = [];
            const getSurveyQry = `SELECT surveyID, surveyName, adminID, userID FROM takesurvey WHERE userID = '${userID}' AND isDeleted = 0`;
            const getSurveyRes = await DBSequelize.query(getSurveyQry, {
                type: Sequelize.QueryTypes.SELECT
            });
            if (getSurveyRes.length > 0) {
                for (var j = 0; j < getSurveyRes.length; j++) {
                    const getSurveyQuestionsQry = `SELECT surveyQuestion, surveyAnswer FROM takesurveydetail WHERE surveyID = '${getSurveyRes[j].surveyID}'`;
                    const getSurveyQuestionsRes = await DBSequelize.query(getSurveyQuestionsQry, {
                        type: Sequelize.QueryTypes.SELECT
                    });

                    data[j] = {
                        surveyID: getSurveyRes[j].surveyID,
                        surveyName: getSurveyRes[j].surveyName,
                        adminID: getSurveyRes[j].adminID,
                        userID: getSurveyRes[j].userID,
                        questions: getSurveyQuestionsRes
                    };
                }

                return Response(res)({
                    message: "Get Successfully",
                    statusCode: 200,
                    response: { data }
                });
            } else {
                return Response(res)({
                    message: "No Survey against this User",
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

    async deleteTakeSurvey(req, res) {
        const { surveyID } = req.params;
        try {
            const deleteQry = `UPDATE takesurvey SET isDeleted = 1 WHERE surveyID = '${surveyID}'`;
            const deleteRes = await DBSequelize.query(deleteQry, {
                type: Sequelize.QueryTypes.UPDATE
            });
            return Response(res)({
                message: "Deleted Successfully",
                statusCode: 200,
                response: { result: deleteRes }
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

module.exports = new SurveyController();

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

    async createSurvey(req, res) {
        const { surveyName, surveyQuestion, adminID, addedAt } = req.body;
        try {
            const insertQry = `INSERT INTO survey(surveyName, surveyQuestion, adminID, addedAt) VALUES ('${surveyName}','${surveyQuestion}','${adminID}','${addedAt}')`;
            const result = await DBSequelize.query(insertQry, {
                type: Sequelize.QueryTypes.INSERT
            });
            return Response(res)({
                message: "Survey created!",
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

    async getSurveys(req, res) {
        try {
            const getQry = `SELECT * FROM survey`;
            const result = await DBSequelize.query(getQry, { type: Sequelize.QueryTypes.SELECT });
            return Response(res)({
                message: "Get Successfully",
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

    async getSurveysByAdmin(req, res) {
        const { adminID } = req.params;
        try {
            const getQry = `SELECT * FROM survey WHERE adminID = '${adminID}'`;
            const result = await DBSequelize.query(getQry, { type: Sequelize.QueryTypes.SELECT });
            return Response(res)({
                message: "Get Successfully",
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

module.exports = new SurveyController();

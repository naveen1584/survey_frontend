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
        const { data } = req.body;
        try {
            const getIDQry = `SELECT surveyID FROM survey ORDER BY surveyID DESC LIMIT 1`;
            const getIDRes = await DBSequelize.query(getIDQry, {
                type: Sequelize.QueryTypes.SELECT
            });
            var latestID;
            if (getIDRes.length > 0) {
                latestID = autoIncrementId(getIDRes[0].surveyID);
            } else {
                latestID = "SR001";
            }
            const insertQry = `INSERT INTO survey(surveyID, surveyName, adminID) VALUES ('${latestID}','${data.surveyName}','${data.adminID}')`;
            const result = await DBSequelize.query(insertQry, {
                type: Sequelize.QueryTypes.INSERT
            });
            var questionArray = data.questions;
            for (var i = 0; i < questionArray.length; i++) {
                const insertQuestionQry = `INSERT INTO surveyquestion(surveyID, surveyQuestion, adminID) VALUES ('${latestID}','${questionArray[i].question}','${data.adminID}')`;
                const insertQuestionRes = await DBSequelize.query(insertQuestionQry, {
                    type: Sequelize.QueryTypes.INSERT
                });
                var optionArray = questionArray[i].options;
                if (optionArray.length > 0) {
                    for (var j = 0; j < optionArray.length; j++) {
                        const insertOptionQry = `INSERT INTO surveydetail(surveyID, questionID, choiceQuestion, adminID) VALUES ('${latestID}','${insertQuestionRes[0]}','${optionArray[j].name}','${data.adminID}')`;
                        const insertOptionRes = await DBSequelize.query(insertOptionQry, {
                            type: Sequelize.QueryTypes.INSERT
                        });
                    }
                }
            }
            return Response(res)({
                message: "Get Successfully",
                statusCode: 200,
                response: { latestID }
            });
        } catch (error) {
            return Response(res)({
                message: "Failed",
                statusCode: 400,
                response: { error }
            });
        }
    }

    async getSurvey(req, res) {
        const { surveyID } = req.params;
        try {
            const getSurveyQry = ``;
            const getSurveyRes = await DBSequelize.query(getSurveyQry, {
                type: Sequelize.QueryTypes.SELECT
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

            // return Response(res)({
            //     message: "Get Successfully",
            //     statusCode: 200,
            //     response: { result }
            // });
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

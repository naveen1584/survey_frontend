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

    async getSurveyByID(req, res) {
        const { surveyID } = req.params;
        try {
            var result;
            var questions = [];
            const getSurveyQry = `SELECT surveyID, surveyName, adminID FROM survey WHERE surveyID = '${surveyID}' AND isDeleted = 0`;
            const getSurveyRes = await DBSequelize.query(getSurveyQry, {
                type: Sequelize.QueryTypes.SELECT
            });
            if (getSurveyRes.length > 0) {
                const getSurveyQuestionsQry = `SELECT id, surveyID, surveyQuestion, adminID FROM surveyquestion WHERE surveyID = '${surveyID}'`;
                const getSurveyQuestionsRes = await DBSequelize.query(getSurveyQuestionsQry, {
                    type: Sequelize.QueryTypes.SELECT
                });

                for (var i = 0; i < getSurveyQuestionsRes.length; i++) {
                    const getSurveyOptionsQry = `SELECT id, surveyID, questionID, choiceQuestion, adminID FROM surveydetail WHERE questionID = '${getSurveyQuestionsRes[i].id}'`;
                    const getSurveyOptionsRes = await DBSequelize.query(getSurveyOptionsQry, {
                        type: Sequelize.QueryTypes.SELECT
                    });
                    questions[i] = { question: getSurveyQuestionsRes[i].surveyQuestion, options: getSurveyOptionsRes };
                }

                result = {
                    surveyID: getSurveyRes[0].surveyID,
                    surveyName: getSurveyRes[0].surveyName,
                    adminID: getSurveyRes[0].adminID,
                    questions: questions
                };

                return Response(res)({
                    message: "Get Successfully",
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

    async getSurveyByIDForTake(req, res) {
        const { surveyID } = req.params;
        try {
            var result;
            var textQuestions = [];
            var choiceQuestions = [];
            var p = 0;
            var o = 0;
            const getSurveyQry = `SELECT surveyID, surveyName, adminID FROM survey WHERE surveyID = '${surveyID}' AND isDeleted = 0`;
            const getSurveyRes = await DBSequelize.query(getSurveyQry, {
                type: Sequelize.QueryTypes.SELECT
            });
            if (getSurveyRes.length > 0) {
                const getSurveyQuestionsQry = `SELECT id, surveyID, surveyQuestion, adminID FROM surveyquestion WHERE surveyID = '${surveyID}'`;
                const getSurveyQuestionsRes = await DBSequelize.query(getSurveyQuestionsQry, {
                    type: Sequelize.QueryTypes.SELECT
                });

                for (var i = 0; i < getSurveyQuestionsRes.length; i++) {
                    const getSurveyOptionsQry = `SELECT choiceQuestion FROM surveydetail WHERE questionID = '${getSurveyQuestionsRes[i].id}'`;
                    const getSurveyOptionsRes = await DBSequelize.query(getSurveyOptionsQry, {
                        type: Sequelize.QueryTypes.SELECT
                    });
                    if (getSurveyOptionsRes.length > 0) {
                        var choices = getSurveyOptionsRes.map(function (item) {
                            return item["choiceQuestion"];
                        });

                        choiceQuestions[p] = {
                            question: getSurveyQuestionsRes[i].surveyQuestion,
                            options: choices
                        };
                        p++;
                    } else {
                        textQuestions[o] = {
                            question: getSurveyQuestionsRes[i].surveyQuestion,
                            options: getSurveyOptionsRes
                        };
                        o++;
                    }
                }

                result = {
                    surveyID: getSurveyRes[0].surveyID,
                    surveyName: getSurveyRes[0].surveyName,
                    adminID: getSurveyRes[0].adminID,
                    choiceQuestions: choiceQuestions,
                    textQuestions: textQuestions
                };

                return Response(res)({
                    message: "Get Successfully",
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

    async getSurveys(req, res) {
        try {
            var result = [];
            var questions = [];

            const getSurveyQry = `SELECT surveyID, surveyName, adminID FROM survey WHERE isDeleted = 0`;
            const getSurveyRes = await DBSequelize.query(getSurveyQry, {
                type: Sequelize.QueryTypes.SELECT
            });

            for (var j = 0; j < getSurveyRes.length; j++) {
                const getSurveyQuestionsQry = `SELECT id, surveyID, surveyQuestion, adminID FROM surveyquestion WHERE surveyID = '${getSurveyRes[j].surveyID}'`;
                const getSurveyQuestionsRes = await DBSequelize.query(getSurveyQuestionsQry, {
                    type: Sequelize.QueryTypes.SELECT
                });

                for (var i = 0; i < getSurveyQuestionsRes.length; i++) {
                    const getSurveyOptionsQry = `SELECT id, surveyID, questionID, choiceQuestion, adminID FROM surveydetail WHERE questionID = '${getSurveyQuestionsRes[i].id}'`;
                    const getSurveyOptionsRes = await DBSequelize.query(getSurveyOptionsQry, {
                        type: Sequelize.QueryTypes.SELECT
                    });
                    questions[i] = { question: getSurveyQuestionsRes[i].surveyQuestion, options: getSurveyOptionsRes };
                }

                result[j] = {
                    surveyID: getSurveyRes[j].surveyID,
                    surveyName: getSurveyRes[j].surveyName,
                    adminID: getSurveyRes[j].adminID,
                    questions: questions
                };

                questions = [];
            }

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
            var result = [];
            var questions = [];

            const getSurveyQry = `SELECT surveyID, surveyName, adminID FROM survey WHERE adminID = '${adminID}' AND isDeleted = 0`;
            const getSurveyRes = await DBSequelize.query(getSurveyQry, {
                type: Sequelize.QueryTypes.SELECT
            });
            if (getSurveyRes.length > 0) {
                for (var j = 0; j < getSurveyRes.length; j++) {
                    const getSurveyQuestionsQry = `SELECT id, surveyID, surveyQuestion, adminID FROM surveyquestion WHERE surveyID = '${getSurveyRes[j].surveyID}'`;
                    const getSurveyQuestionsRes = await DBSequelize.query(getSurveyQuestionsQry, {
                        type: Sequelize.QueryTypes.SELECT
                    });

                    for (var i = 0; i < getSurveyQuestionsRes.length; i++) {
                        const getSurveyOptionsQry = `SELECT id, surveyID, questionID, choiceQuestion, adminID FROM surveydetail WHERE questionID = '${getSurveyQuestionsRes[i].id}'`;
                        const getSurveyOptionsRes = await DBSequelize.query(getSurveyOptionsQry, {
                            type: Sequelize.QueryTypes.SELECT
                        });
                        questions[i] = {
                            question: getSurveyQuestionsRes[i].surveyQuestion,
                            options: getSurveyOptionsRes
                        };
                    }

                    result[j] = {
                        surveyID: getSurveyRes[j].surveyID,
                        surveyName: getSurveyRes[j].surveyName,
                        adminID: getSurveyRes[j].adminID,
                        questions: questions
                    };

                    questions = [];
                }

                return Response(res)({
                    message: "Get Successfully",
                    statusCode: 200,
                    response: { result }
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

    async deleteSurvey(req, res) {
        const { surveyID } = req.params;
        try {
            const deleteQry = `UPDATE survey SET isDeleted = 1 WHERE surveyID = '${surveyID}'`;
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

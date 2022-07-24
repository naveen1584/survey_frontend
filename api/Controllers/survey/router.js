const router = require("express").Router();

const controller = require("./controller");

const { decodeJWTMiddleWare } = require("../../Helpers/Utils");

router.post("/createSurvey", decodeJWTMiddleWare, controller.createSurvey);

router.get("/getSurveyByID/:surveyID", decodeJWTMiddleWare, controller.getSurveyByID);

router.get("/getSurveys", decodeJWTMiddleWare, controller.getSurveys);

router.get("/getSurveyByIDForTake/:surveyID", decodeJWTMiddleWare, controller.getSurveyByIDForTake);

router.get("/getSurveysByAdmin/:adminID", decodeJWTMiddleWare, controller.getSurveysByAdmin);

router.put("/deleteSurvey/:surveyID", decodeJWTMiddleWare, controller.deleteSurvey);

module.exports = router;

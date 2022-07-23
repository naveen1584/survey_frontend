const router = require("express").Router();

const controller = require("./controller");

const { decodeJWTMiddleWare } = require("../../Helpers/Utils");

router.post("/createTakeSurvey", decodeJWTMiddleWare, controller.createTakeSurvey);

router.get("/getTakeSurveyByID/:surveyID", decodeJWTMiddleWare, controller.getTakeSurveyByID);

router.get("/getTakeSurveys", decodeJWTMiddleWare, controller.getTakeSurveys);

router.get("/getTakeSurveysByAdmin/:adminID", decodeJWTMiddleWare, controller.getTakeSurveysByAdmin);

router.get("/getTakeSurveysByUser/:userID", decodeJWTMiddleWare, controller.getTakeSurveysByUser);

router.put("/deleteTakeSurvey/:surveyID", decodeJWTMiddleWare, controller.deleteTakeSurvey);

module.exports = router;

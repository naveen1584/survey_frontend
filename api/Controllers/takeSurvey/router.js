const router = require("express").Router();
const controller = require("./controller");

router.post("/createSurvey", controller.createSurvey);

router.get("/getSurveyByID/:surveyID", controller.getSurveyByID);

router.get("/getSurveys", controller.getSurveys);

router.get("/getSurveysByAdmin/:adminID", controller.getSurveysByAdmin);

router.put("/deleteSurvey/:surveyID", controller.deleteSurvey);

module.exports = router;

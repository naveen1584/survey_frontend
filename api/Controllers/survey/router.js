const router = require("express").Router();
const controller = require("./controller");

router.post("/createSurvey", controller.createSurvey);

router.get("/getSurveys", controller.getSurveys);

router.get("/getSurveysByAdmin/:adminID", controller.getSurveysByAdmin);

module.exports = router;

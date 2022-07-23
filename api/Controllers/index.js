const auth = require("./auth/router");
const survey = require("./survey/router");
const takeSurvey = require("./takeSurvey/router");

const ROUTERS = [auth, survey, takeSurvey];

const registerRouters = (app) => ROUTERS.map((router) => app.use(router));

module.exports = registerRouters;

const auth = require("./auth/router");
const survey = require("./survey/router");

const ROUTERS = [auth, survey];

const registerRouters = (app) => ROUTERS.map((router) => app.use(router));

module.exports = registerRouters;

const router = require("express").Router();

const controller = require("./controller");

const { decodeJWTMiddleWare } = require("../../Helpers/Utils");

router.post("/createUser", decodeJWTMiddleWare, controller.createUser);

router.post("/createClientUser", controller.createUser);

router.post("/auth", controller.auth);

router.get("/getRoles", decodeJWTMiddleWare, controller.getRoles);

router.get("/getUserByType/:roleID", decodeJWTMiddleWare, controller.getUserByTypes);

router.get("/getUserByID/:userId", decodeJWTMiddleWare, controller.getUserByID);

router.put("/deleteUser/:userId", decodeJWTMiddleWare, controller.deleteUser);

module.exports = router;

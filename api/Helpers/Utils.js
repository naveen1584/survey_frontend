const jwt = require("jsonwebtoken");
const { Response } = require("./Response");

const createJWT = (payload) => {
    const secrete = process.env.SECRETE_KEY;
    return jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
            data: payload
        },
        secrete
    );
};

const decodeJWT = (token) => {
    const secrete = process.env.SECRETE_KEY;
    return jwt.verify(token, secrete);
};

const decodeJWTMiddleWare = (req, res, next) => {
    try {
        if ("token" in req.headers) {
            console.log("there are token headers");
            const token = req.headers["token"];
            const user = decodeJWT(token).data;
            if (!user) {
                return res.status(200).json({
                    statusCode: 400,
                    message: "Token is expired"
                });
            } else {
                req.body.userData = user;
                next();
            }
        } else
            res.status(200).json({
                statusCode: 400,
                message: "Token header not found"
            });
    } catch (err) {
        res.status(400).json({
            statusCode: 400,
            message: "Token expired"
        });
    }
};

const exceptionHandlingMiddleware = (fn) => (req, res, next) => {
    res.statusCode = 503;
    Promise.resolve()
        .then(() => fn(req, res, next))
        .catch((error) => {
            console.debug(error.stack);
            return Response(res)({
                message: "Unhandled exception",
                statusCode: 400,
                response: { error: error.stack }
            });
        });
};

const autoIncrementId = (lastRecordId) => {
    var parts = lastRecordId.match(/[a-zA-Z]+|[0-9]+/g);
    var increasedNum = Number(lastRecordId.replace(parts[0], "")) + 1;
    var kmsStr = lastRecordId.substr(0, 3);
    for (let i = 0; i < 4 - increasedNum.toString().length; i++) {
        kmsStr = kmsStr + "0";
    }
    kmsStr = kmsStr + increasedNum.toString();
    return kmsStr;
};

module.exports = {
    createJWT,
    decodeJWT,
    decodeJWTMiddleWare,
    autoIncrementId,
    exceptionHandlingMiddleware
};

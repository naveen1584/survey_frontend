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
            const token = req.headers["token"];
            const user = decodeJWT(token).data;
            if (!user) {
                return Response(res)({
                    message: "Token is expired",
                    statusCode: 400,
                    response: {}
                });
            } else {
                req.body.userData = user;
                next();
            }
        } else
            return Response(res)({
                message: "Token header not found",
                statusCode: 400,
                response: {}
            });
    } catch (err) {
        return Response(res)({
            message: "Token Expired",
            statusCode: 400,
            response: {}
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
    var kmsStr = lastRecordId.substr(0, 2);
    for (let i = 0; i < 3 - increasedNum.toString().length; i++) {
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

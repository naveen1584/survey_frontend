const Response =
    (res) =>
    ({ message = message, statusCode = statusCode, response = {} }) => {
        return res.status(statusCode).json({
            status: {
                statusCode: statusCode,
                message: message
            },
            response: response
        });
    };

module.exports = {
    Response
};

const Sequelize = require("sequelize");
const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const ENV = process.env.ENV === "dev" ? "mysql" : "mariadb";
const getConnection = () => {
    let sequelize = null;
    return () => {
        if (sequelize) {
            return sequelize;
        }
        try {
            sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
                host: DB_HOST,
                port: DB_PORT,
                dialect: ENV
            });

            sequelize
                .authenticate()
                .then(() => {})
                .catch((err) => {
                    console.log("mysql db error", err);
                });
            return sequelize;
        } catch (err) {
            console.log(`error while connecting db err= ${err}`);
        }
    };
};

module.exports = getConnection();

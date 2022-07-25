const { Response } = require("../Helpers/Response");
const model = require("./model");

var Sequelize = require("sequelize");
const sequelize = require("../SequelizeConfig");
const DBSequelize = require("./DBSequelizeConfig");
const BaseModel = require("./model");
var nodemailer = require("nodemailer");

class Controller {
    constructor() {
        this.getAll = this.getAllById.bind(this);
        this.insert = this.insert.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    static async sendHTMLMail({ to, subject, text, html }) {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "mailtesting608@gmail.com",
                pass: "mail@Testing@608"
            }
        });

        var mailOptions = {
            from: "mailtesting608@gmail.com",
            to: to,
            subject: subject,
            text: text,
            html: html
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    }

    async getAll(req, res, tableName) {
        var retVal = null;
        retVal = await model.findAll(req, res, tableName);

        return Response(res)({ response: retVal });
    }
    async getAllById(req, res, tableName) {
        var retVal = await model.findAllByPrimaryKey(req, res, tableName);

        return Response(res)({ response: retVal });
    }

    async insert(req, res, tableName) {
        let response = await model.insert(req, res, tableName);
    }

    async update(req, res, tableName) {
        var { id } = req.params;

        let response = await model.update(req, res, tableName);
    }

    async delete(req, res, tableName) {
        var id = req.params.id;

        let response = await this.model.delete(id);

        return res.status(response.statusCode).send(response);
    }
}

module.exports = Controller;

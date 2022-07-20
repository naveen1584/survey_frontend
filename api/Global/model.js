// const { model } = require('sequelize');

var Sequelize = require("sequelize");
const sequelize = require("../SequelizeConfig");
const DBSequelize = require("./DBSequelizeConfig");
const e = require("express");
const { errors } = require("openid-client");

class BaseModel {
    static inputType = {
        "int(11)": { type: "int", length: 11 },
        "varchar(45)": { type: "varchar", length: 45 },
        "char(6)": { type: "char", length: 6 },
        datetime: { type: "datetime", length: -1 },
        double: { type: "double", length: 11 },
        "varchar(255)": { type: "varchar", length: 255 },
        "varchar(1024)": { type: "varchar", length: 1024 }
    };
    static async getColumnsOfTable(tableName) {
        var query = `SHOW COLUMNS FROM ${tableName}`;
        var retVal = await DBSequelize.query(query, {
            type: Sequelize.QueryTypes.SELECT
        });

        return retVal;
    }

    static isObject(obj) {
        return obj != null && obj.constructor.name === "Object";
    }

    static isValidDate(dateString) {
        var regEx = "/^d{4}-d{2}-d{2}$/";
        //if(!dateString.match(regEx)) return false;  // Invalid format
        var d = new Date(dateString);
        var dNum = d.getTime();
        if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
        return d.toISOString().slice(0, 10) === dateString;
    }

    static isObject(obj) {
        return obj != null && obj.constructor.name === "Object";
    }

    static async validateStructure(objectTree, inputBody, path, pathArray, errors) {
        for (const [key, value] of Object.entries(objectTree)) {
            if (BaseModel.isObject(value)) {
                if (inputBody) {
                    var currentInputBody = eval("inputBody" + "." + key);
                    if (!currentInputBody) {
                        throw `${key} is not found in input`;
                    }
                    pathArray.push(path + "." + key);
                    pathArray = await BaseModel.validateStructure(
                        value,
                        currentInputBody,
                        path + "." + key,
                        pathArray,
                        errors
                    );
                } else {
                    throw `${key} is not found in input`;
                }
            }
        }
        return pathArray;
    }

    static async validateInput(validateInputAgainst, inputBody) {
        var pathArray = [];
        var path = "";
        var errors = [];
        try {
            pathArray = await BaseModel.validateStructure(validateInputAgainst, inputBody, path, pathArray, errors);
            for (var i = 0; i < pathArray.length; i++) {
                if (inputBody) {
                    const executeThis = `inputBody${pathArray[i]}`;
                    const executedValue = eval(executeThis);
                    if (executedValue === undefined) {
                        errors.push(`${pathArray[i]} element not found in input`);
                    }
                }
            }
        } catch (err) {
            errors.push(err);
        } finally {
            return { errors, pathArray };
        }
    }

    static camelize(str) {
        return str
            .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            })
            .replace(/\s+/g, "");
    }

    static async validateObject(inputObject, inputBody, errors, isUseCaseForInsertion, pathArray) {
        const tableName = inputObject;
        const columns = await BaseModel.getColumnsOfTable(tableName);
        for (var i = 0; i < columns.length; i++) {
            var currentColumn = columns[i];

            var columnName = currentColumn.Field;
            if (columnName !== "last_updated_by" && columnName !== "last_updated_at") {
                var columnType = currentColumn.Type;
                var allowsNull = currentColumn.Null;
                var isPK = false;

                if ("PRI" === currentColumn.Key || "MUL" === currentColumn.Key) {
                    isPK = true;
                    if ("MUL" === currentColumn.Key) {
                        var columnNameCamelCase = columnName.replace(/_/g, " ");
                        columnNameCamelCase = columnNameCamelCase.replace(/ id/g, "");
                        columnNameCamelCase = BaseModel.camelize(columnNameCamelCase);

                        var found = false;
                        for (var j = 0; j < pathArray.length; j++) {
                            i;
                            if (pathArray[j].includes(columnNameCamelCase)) {
                                found = true;
                                isPK = true;
                                break;
                            }
                        }
                        if (found) {
                            isPK = true;
                        } else {
                            isPK = false;
                        }
                    }
                } else {
                    isPK = false;
                }
                if (!inputBody) {
                    errors.push(`${tableName}.${columnName} can not be null`);
                } else {
                    var valueToValidate = eval(`inputBody.${columnName}`);
                    if (isUseCaseForInsertion) {
                        if (!isPK) {
                            if (allowsNull === "NO") {
                                if (!valueToValidate) {
                                    errors.push(`${tableName}.${columnName} can not be null`);
                                }
                            } else {
                                if (valueToValidate) {
                                    errors = BaseModel.validateColumn(
                                        columnType,
                                        valueToValidate,
                                        errors,
                                        tableName,
                                        columnName,
                                        isUseCaseForInsertion
                                    );
                                }
                            }
                        }
                    } else {
                        if (allowsNull === "NO") {
                            if (!isUseCaseForInsertion) {
                                if (!valueToValidate) {
                                    errors.push(`${tableName}.${columnName} can not be null`);
                                }
                            }
                        }
                        errors = BaseModel.validateColumn(
                            columnType,
                            valueToValidate,
                            errors,
                            tableName,
                            columnName,
                            isUseCaseForInsertion
                        );
                    }
                }
            }
        }
        return errors;
    }
    static validateColumn(columnType, valueToValidate, errors, tableName, columnName, isUseCaseForInsertion) {
        if (columnType === "int(11)") {
            if ((valueToValidate && isNaN(valueToValidate)) || valueToValidate === "") {
                errors.push(
                    `${tableName}.${columnName} type is expected to be a integer and received value is ${valueToValidate}`
                );
            }
        } else if (columnType === "varchar(45)") {
            if (valueToValidate && valueToValidate.length > 45) {
                errors.push(
                    `${tableName}.${columnName} length can not be greater than 45 and received value is ${valueToValidate.length} characters long`
                );
            }
        } else if (columnType === "char(6)") {
            if (valueToValidate && valueToValidate.length > 6) {
                errors.push(
                    `${tableName}.${columnName} length can not be greater than 6 and received value is ${valueToValidate.length} characters long`
                );
            }
        } else if (columnType === "datetime" || columnType === "date") {
            if (valueToValidate && !BaseModel.isValidDate(valueToValidate)) {
                errors.push(`${tableName}.${columnName} ${valueToValidate} is not a valid date`);
            }
        } else if (columnType === "double") {
            if ((valueToValidate && isNaN(valueToValidate)) || valueToValidate == null || valueToValidate === "") {
                errors.push(
                    `${tableName}.${columnName} type is expected to be a double and received value is ${valueToValidate}`
                );
            }
        } else if (columnType === "varchar(255)") {
            if (valueToValidate && valueToValidate.length > 255) {
                errors.push(
                    `${tableName}.${columnName} length can not be greater than 255 and received value is ${valueToValidate.length} characters long`
                );
            }
        } else if (columnType === "varchar(1024)") {
            if (valueToValidate && valueToValidate.length > 1024) {
                errors.push(
                    `${tableName}.${columnName} length can not be greater than 1024 and received value is ${valueToValidate.length} characters long`
                );
            }
        } else if (columnType === "tinyint(4)") {
            if (valueToValidate && valueToValidate.length > 1) {
                errors.push(
                    `${tableName}.${columnName} length can not be greater than 1 and received value is ${valueToValidate.length} characters long`
                );
            }
        }

        return errors;
    }

    static async iterateObjectTree(objectTree, inputBody, errors, isUseCaseForInsertion, pathArray) {
        for (const [key, value] of Object.entries(objectTree)) {
            if (BaseModel.isObject(value)) {
                if (!inputBody) {
                    errors.push(`${key} not found in input`);
                } else {
                    var currentInputBody = eval("inputBody" + "." + key);
                    errors = await BaseModel.iterateObjectTree(
                        value,
                        currentInputBody,
                        errors,
                        isUseCaseForInsertion,
                        pathArray
                    );
                }
            } else {
                errors = await BaseModel.validateObject(value, inputBody, errors, isUseCaseForInsertion, pathArray);
            }
        }
        return errors;
    }

    static async findAll(req, res, tableName) {
        const retVal = await DBSequelize.query(`SELECT * from ${tableName};`, {
            type: DBSequelize.QueryTypes.SELECT
        });
        var retArray = [];
        var baseModel;
        if (retVal.length > 1) {
            for (var i = 0; i < retVal.length; i++) {
                baseModel = Object.assign({}, retVal[i]);
                retArray[i] = baseModel;
            }
            return retArray;
        }
        baseModel = Object.assign({}, retVal[0]);
        retArray.push(baseModel);
        return retArray;
    }

    static async sendPush(req, res) {
        request(
            {
                url: "",
                method: "POST",
                headers: {
                    "Content-Type": " application/json",
                    Authorization: ""
                },
                body: JSON.stringify({
                    data: {
                        notification: notification,
                        _id: _id,
                        action: action
                    },
                    registration_ids: registration_ids,
                    content_available: true
                })
            },
            function (error, response, body) {
                if (error) {
                    console.error(error, response, body);
                } else if (response.statusCode >= 400) {
                    console.error("HTTP Error: " + response.statusCode + " - " + response.statusMessage + "\n" + body);
                } else {
                    console.log(response);
                }
            }
        );
        baseModel = Object.assign({}, response);
        // retArray.push(baseModel);
        return baseModel;
    }

    static async findAllByPrimaryKey(req, res, tableName) {
        var { id } = req.params;
        var primaryKeyFieldName = await BaseModel.getPrimaryKeyFieldName(tableName, primaryKeyFieldName);

        const retVal = await DBSequelize.query(`SELECT * from ${tableName} where ${primaryKeyFieldName}=${id};`, {
            type: DBSequelize.QueryTypes.SELECT
        });
        var retArray = [];
        var baseModel;
        if (retVal.length > 1) {
            for (var i = 0; i < retVal.length; i++) {
                baseModel = await Object.assign({}, retVal[i][0]);
                retArray[i] = baseModel;
            }
            return retArray;
        }
        baseModel = Object.assign({}, retVal[0]);
        return baseModel;
    }

    static async findByPrimaryKey(tableName, id) {
        var primaryKeyFieldName = await BaseModel.getPrimaryKeyFieldName(tableName, primaryKeyFieldName);

        const retVal = await DBSequelize.query(`SELECT * from ${tableName} where ${primaryKeyFieldName}=${id};`, {
            type: DBSequelize.QueryTypes.SELECT
        });
        var retArray = [];
        var baseModel;
        if (retVal.length > 1) {
            for (var i = 0; i < retVal.length; i++) {
                baseModel = await Object.assign({}, retVal[i][0]);
                retArray[i] = baseModel;
            }
            return retArray;
        }
        baseModel = Object.assign({}, retVal[0]);
        return baseModel;
    }
    static async getPrimaryKeyFieldName(tableName, primaryKeyFieldName) {
        const columns = await BaseModel.getColumnsOfTable(tableName);
        for (var i = 0; i < columns.length; i++) {
            const currentColumn = columns[i];
            if (currentColumn.Key === BaseModel.PRIMARY_KEY()) {
                primaryKeyFieldName = currentColumn.Field;
            }
        }
        return primaryKeyFieldName;
    }

    static PRIMARY_KEY() {
        return "PRI";
    }

    static async findAllWithWhereClause(req, res, tableName, whereClause) {
        const retVal = await DBSequelize.query(`SELECT * from ${tableName} where ${whereClause};`, {
            type: DBSequelize.QueryTypes.SELECT
        });
        var retArray = [];
        var baseModel;
        for (var i = 0; i < retVal.length; i++) {
            baseModel = Object.assign({}, retVal[i]);
            retArray[i] = baseModel;
        }
        return retArray;
        baseModel = Object.assign({}, retVal[0]);
        return baseModel;
    }
}

module.exports = BaseModel;

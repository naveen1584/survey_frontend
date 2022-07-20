require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const registerRouters = require("./Controllers/");
const { Response } = require("./Helpers/Response");
const SequelizeConfig = require("./SequelizeConfig");
const fileUpload = require("express-fileupload");

const app = express();
const PORT = process.env.PORT;

app.use(cors());

//  create db connection
console.log("process.env outside", process.env.DB_NAME);
SequelizeConfig();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());
app.get("/", (req, res) => {
    return Response(res)({ message: "Welcome to Survey API" });
});

// register all routes
registerRouters(app);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500).json({ message: err.message });
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server has started @PORT = ${PORT}`);
    }
});

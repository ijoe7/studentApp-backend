const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./config/errorController");
const studentRouter = require("./routes/studentRoutes");
const classRouter = require("./routes/classRoutes");

app.use(cors());
app.options("*", cors());
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/api/student', studentRouter);
app.use('/api/class', classRouter);

// error handler
app.use((req, res, next)=>{
    let err = new Error(`${req.ip} tried to reach a resource at ${req.originalUrl} that is not on this server.`, 404);
    next(err);
});

app.use(errorHandler);

module.exports = app;
const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");
// const cors = require("cors");
// const {
//   psqlErrorHandler,
//   customErrorHandler,
//   serverErrorHandler,
// } = require("./error-handlers/error-handlers");

// app.use(cors());
//Middleware
app.use(express.json()); // Only when we post

//Routes
app.get("/", (req, res) => res.send("please use /api"));
app.use("/api", apiRouter);
// app.use(psqlErrorHandler);
// app.use(customErrorHandler);
// app.use(serverErrorHandler);

module.exports = app;

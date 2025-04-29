const express = require("express");
const app = express();
const apiRouter = require("./routes/api.routes");
const cors = require("cors");
const {
  psqlErrorHandler,
  customErrorHandler,
  serverErrorHandler,
} = require("./middleware/error-handlers");

//Middleware
app.use(express.json()); // Only when we post
app.use(cors());

//Routes
app.get("/", (req, res) => res.send("please use /api"));
app.use("/api", apiRouter);
// 404 Handler — must come after route definitions
app.use((req, res) => {
  res.status(404).send({ msg: "Route not found" });
});
// Error Handlers
app.use(psqlErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = app;

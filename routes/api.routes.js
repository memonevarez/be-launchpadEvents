const apiRouter = require("express").Router();
const endpoints = require("../endpoints.json");

const eventsRouter = require("./event.routes");
const usersRouter = require("./user.routes");

apiRouter.get("/", (request, response) => {
  response.status(200).send({ endpoints: endpoints });
});

apiRouter.use("/events", eventsRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;

const eventsRouter = require("express").Router();
const {
  getUsers,
  loginUser,
  getCreatedEvents,
  getAttendingEvents,
} = require("../controllers/user.controller");

eventsRouter.route("/").get(getUsers);
eventsRouter.route("/login").post(loginUser);
eventsRouter.route("/:user_id/created-events").get(getCreatedEvents);
eventsRouter.route("/:user_id/attending").get(getAttendingEvents);

module.exports = eventsRouter;

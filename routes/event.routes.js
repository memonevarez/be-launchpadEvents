const eventsRouter = require("express").Router();
const {
  getEvents,
  getEventById,
  deleteEventById,
  postEvent,
  getEventByUserId,
  postUserAttendsEvent,
} = require("../controllers/event.controller");

eventsRouter.route("/").get(getEvents).post(postEvent);
eventsRouter.route("/:event_id").get(getEventById).delete(deleteEventById);
eventsRouter.route("/:user_id").get(getEventByUserId);
eventsRouter.route("/:event_id/attendEvent").post(postUserAttendsEvent);
// articlesRouter
//   .route("/:article_id")
//   .get(getArticleById)
//   .patch(patchArticleByArticleId);
// articlesRouter
//   .route("/:article_id/comments")
//   .get(getCommentsByArticleId)
//   .post(postCommentByArticleId);

module.exports = eventsRouter;

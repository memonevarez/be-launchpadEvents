const eventsRouter = require("express").Router();
const {
  getEvents,
  getEventById,
  postEvent,
} = require("../controllers/event.controller");

eventsRouter.route("/").get(getEvents).post(postEvent);
eventsRouter.route("/:event_id").get(getEventById);
// articlesRouter
//   .route("/:article_id")
//   .get(getArticleById)
//   .patch(patchArticleByArticleId);
// articlesRouter
//   .route("/:article_id/comments")
//   .get(getCommentsByArticleId)
//   .post(postCommentByArticleId);

module.exports = eventsRouter;

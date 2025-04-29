const eventsRouter = require("express").Router();
const { getEvents, getEventById } = require("../controllers/event.controller");

eventsRouter.route("/").get(getEvents);
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

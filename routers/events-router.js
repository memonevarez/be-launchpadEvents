const eventsRouter = require("express").Router();
const { getEvents } = require("../controllers/events-controller");

eventsRouter.route("/").get(getEvents);
// articlesRouter
//   .route("/:article_id")
//   .get(getArticleById)
//   .patch(patchArticleByArticleId);
// articlesRouter
//   .route("/:article_id/comments")
//   .get(getCommentsByArticleId)
//   .post(postCommentByArticleId);

module.exports = eventsRouter;

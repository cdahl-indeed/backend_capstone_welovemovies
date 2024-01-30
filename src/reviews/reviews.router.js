const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router.use(cors())

// TODO: Add your routes here

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router
    .route("/:review_id")
    .put(controller.update)
    .delete(controller.destroy)
    .all(methodNotAllowed);

module.exports = router;

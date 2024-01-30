const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router.use(cors());


const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

// TODO: Add your routes here
router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router
    .route("/?is_showing=true")
    .get(controller.list)
    .all(methodNotAllowed);

router
    .route("/:movie_id")
    .get(controller.read)
    .all(methodNotAllowed);


router
    .route("/:movie_id/reviews", reviewsRouter)
    .get(controller.read)
    .all(methodNotAllowed);
router
    .route("/:movie_id/theaters", theatersRouter)
    .get(controller.read)
    .all(methodNotAllowed);


module.exports = router;

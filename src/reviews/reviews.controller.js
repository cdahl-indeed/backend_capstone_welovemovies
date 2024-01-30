const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(request, response, next) {
  // TODO: Write your code here
  const id = request.params.review_id;
  console.log('review_id exist check = ', id)

  const review =  await service.read(id);

  console.log('got review: ',review)
  if (review != null) {
    response.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Sorry, that review cannot be found.` });
}

async function destroy(request, response) {
  // TODO: Write your code here
  service.destroy(response.locals.review.review_id)
      .then(() => response.sendStatus(204))
}

async function list(request, response) {
  // TODO: Write your code here
  //const data = await service.list();
  const  movie_id = request.params.movie_id;
  const reviews = await service.list(movie_id);
  reviews.forEach(review =>
      review["critic"] = {
        "critic_id": review["critic_id"],
        "preferred_name": review["preferred_name"],
        "surname": review["surname"],
        "organization_name": review["organization_name"]
      }
  )

  response.json({data: reviews });
  //response.json({ data });
}

function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
  console.log('request.params.movieId', request.params.movieId)
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(request, response) {
  // TODO: Write your code here
  const updatedReview = {
    ...response.locals.review,
    ...request.body.data,
    review_id: response.locals.review.review_id,
  }
}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};

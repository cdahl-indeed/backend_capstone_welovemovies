const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(request, response, next) {
  // TODO: Write your code here
  const id = request.params.reviewId;
  const review =  await service.read(id);
    console.log('got review: ',review)
  if (review) {
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
  const  movie_id = request.params.movieId;
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
}

function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
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
   const data = await service.update(updatedReview);
  response.json({ data });
}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [noMovieIdInPath, asyncErrorBoundary(reviewExists),update],
};

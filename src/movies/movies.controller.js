const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // TODO: Add your code here.
  const  movie_id = request.params.movieId;
  console.log('movieExists movie_id is:', movie_id)
  const movie = await service.read(movie_id);

  if (movie) {
    response.locals.movie = movie;
    console.log('captured movie:' , movie)
    return next();
  }
  next({ status: 404, message: `Sorry, that movie cannot be found.` });
}

async function read(request, response) {
  // TODO: Add your code here
  //console.log("movie read request", request)
  //console.log("wow look", response.locals.movie)
  response.json({ data: response.locals.movie });
}

async function list(request, response) {
  // TODO: Add your code here.
  console.log('req is showing url',request.query)
  const is_showing = request.query.is_showing;
  const data = await service.list(is_showing);
  response.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  movieExists
};
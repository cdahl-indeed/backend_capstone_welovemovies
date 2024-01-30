const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // TODO: Add your code here.
  const  movie_id = request.params.movie_id;
  //console.log('movie_id is:', movie_id)

  const movie = await service.read(movie_id);

  if (movie != null) {
    response.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Sorry, that movie cannot be found.` });
}

async function read(request, response) {
  // TODO: Add your code here
  //console.log("movie read request", request)
  response.json({ data: response.locals.movie });
}

async function list(request, response) {
  // TODO: Add your code here.

  console.log('req is showing url',request.url)

  const data = await service.list();
  response.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
};

const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(request, response) {
  // TODO: Add your code here
  const movie_id = request.params.movieId;
  if(movie_id){
    const data = await service.listMovieId(movie_id);      
    response.json({ data });
  } else {
    const data = await service.list();
      response.json({ data });
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
};

const db = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
});

async function list() {
  return db
  .from("theaters as t")
    .join(
      "movies_theaters as mt",
      "mt.theater_id",
      "t.theater_id"
    )
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .then(reduceMovies);
}

async function listMovieId(movie_id) {
  return db
    .from("theaters as t")
    .join("movies_theaters as mt",
          "mt.theater_id",
          "t.theater_id")
    .select( "t.*",
      "mt.is_showing",
      "mt.movie_id")
    .where({"mt.movie_id": movie_id})
}


module.exports = {
  list,
  listMovieId,
};
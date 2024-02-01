const db = require("../db/connection");
const knex = require("../db/connection");

const tableName = "reviews";

async function destroy(reviewId) {
  // TODO: Write your code here
  return knex("reviews")
      .select('*')
      .where({"review_id": reviewId})
      .del();
}

async function list(movie_id) {
  // TODO: Write your code here
  return db
      .from("reviews as r")
      .join("critics as c", "r.critic_id", "c.critic_id")
      .select("r.*", "c.*")
      .where({ "r.movie_id": movie_id })
}
  

async function read(reviewId) {
  // TODO: Write your code here
  return db
    .from("reviews")
    .select("*")
    .where({"review_id": reviewId})
    .first();
}

async function readCritic(critic_id) {
  return db("critics")
    .where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  //console.log('review to update: ',review)
  return db
    .from(tableName)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};

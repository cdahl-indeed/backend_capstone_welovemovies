const db = require("../db/connection");
const knex = require("../db/connection");

const tableName = "reviews";

async function destroy(reviewId) {
  // TODO: Write your code here
  return knex("reviews")
      .select('*')
      .where({reviewId})
      .del();
}

async function list(movie_id) {
  // TODO: Write your code here

  return db("reviews as reviews")
      .join("critics as critics", "reviews.critic_id", "critics.critic_id")
      .select("reviews.*", "critics.*")
      .where({ "review.movie_id": movie_id })
}

async function read(reviewId) {
  // TODO: Write your code here
  console.log('reading review ',reviewId)
  const review_id = reviewId;
  return knex("reviews")
      .select("*")
      .where({review_id})
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
  console.log('review to update: ',review)
  return db(tableName)
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

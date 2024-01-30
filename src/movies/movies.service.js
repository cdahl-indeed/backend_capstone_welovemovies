const db = require("../db/connection");
const knex = require("../db/connection");

async function list(is_showing) {

    console.log('here')
    console.log('is showing = ', is_showing)


    return db("movies")
        .select("movies.*")
        .modify((queryBuilder) => {
            if (is_showing) {
                queryBuilder
                    .join(
                        "movies_theaters",
                        "movies.movie_id",
                        "movies_theaters.movie_id"
                    )
                    .where({ "movies_theaters.is_showing": true })
                    .groupBy("movies.movie_id");
            }
        });
    //return knex("movies");
}

async function read(movie_id) {
    // TODO: Add your code here
    //const id = movie_id;
    // console.log('movie id' , id)

    return knex("movies").select("*").where({movie_id}).first();
}

module.exports = {
    list,
    read,
};

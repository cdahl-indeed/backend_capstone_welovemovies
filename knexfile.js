const path = require("path");

require("dotenv").config();
//= 'postgres://thinkfuldb_user:Lk08EBxGiVtpSAx5b15D8MP1oiWaKDl5@dpg-clojre946foc73c7dfl0-a.oregon-postgres.render.com/thinkfuldb?ssl=true',
const {
  DATABASE_URL
} = process.env;
//DATABASE_URL = "postgresql://postgres@localhost/postgres",

module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};

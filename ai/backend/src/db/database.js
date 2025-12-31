const { Pool } = require("pg");

const pool = new Pool({
  user: "amarrajbr",        // your mac username
  host: "localhost",
  database: "phishing_simulator",
  password: "",
  port: 5432,
});

pool.on("connect", () => {
  console.log("PostgreSQL connected");
});

module.exports = pool;
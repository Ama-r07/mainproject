const pool = require("./database");

const init = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS campaigns (
      id TEXT PRIMARY KEY,
      name TEXT,
      difficulty TEXT,
      status TEXT
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      campaign_id TEXT,
      event_type TEXT,
      timestamp BIGINT
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS risk_scores (
      user_id TEXT,
      campaign_id TEXT,
      score INT,
      level TEXT
    )
  `);

  console.log("Tables created");
  process.exit();
};

init();
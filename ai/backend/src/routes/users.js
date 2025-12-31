const express = require("express");
const pool = require("../db/database");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT ON (user_id)
        user_id,
        campaign_id,
        score,
        level
      FROM risk_scores
      ORDER BY user_id, score DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
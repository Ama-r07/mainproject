const express = require("express");
const pool = require("../db/database");

const router = express.Router();

router.get("/summary", async (req, res) => {
  try {
    const users = await pool.query(`
      SELECT DISTINCT ON (user_id)
        user_id,
        campaign_id,
        score,
        level
      FROM risk_scores
      ORDER BY user_id, score DESC
    `);

    let high = 0, medium = 0, low = 0;

    users.rows.forEach(row => {
      if (row.level === "High") high++;
      else if (row.level === "Medium") medium++;
      else if (row.level === "Low") low++;
    });

    res.json({
      totalUsers: users.rows.length,
      high,
      medium,
      low,
      users: users.rows   // 🔥 THIS WAS MISSING
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Dashboard fetch failed" });
  }
});

module.exports = router;
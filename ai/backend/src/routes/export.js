const express = require("express");
const pool = require("../db/database");

const router = express.Router();

router.get("/csv", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT user_id, campaign_id, score, level
      FROM risk_scores
      ORDER BY user_id
    `);

    let csv = "user_id,campaign_id,score,level\n";

    result.rows.forEach(row => {
      csv += `${row.user_id},${row.campaign_id},${row.score},${row.level}\n`;
    });

    res.header("Content-Type", "text/csv");
    res.attachment("phishing_report.csv");
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).send("CSV export failed");
  }
});

module.exports = router;
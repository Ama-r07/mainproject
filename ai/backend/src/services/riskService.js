const pool = require("../db/database");
const { generateExplanation } = require("./aiExplanationService");

const calculateRisk = async (userId, campaignId) => {
  const result = await pool.query(
    `SELECT event_type FROM events 
     WHERE user_id = $1 AND campaign_id = $2`,
    [userId, campaignId]
  );

  let hasClicked = false;
  let hasSubmitted = false;

  result.rows.forEach(row => {
    if (row.event_type === "click") hasClicked = true;
    if (row.event_type === "submit") hasSubmitted = true;
  });

  let score = 0;
  if (hasClicked) score += 40;
  if (hasSubmitted) score += 60;

  let level = "Low";
  if (score >= 70) level = "High";
  else if (score >= 40) level = "Medium";

  const explanation = generateExplanation(score, level, hasClicked, hasSubmitted);

  await pool.query(
    `INSERT INTO risk_scores (user_id, campaign_id, score, level, explanation)
     VALUES ($1, $2, $3, $4, $5)`,
    [userId, campaignId, score, level, explanation]
  );

  return {
  score,
  level,
  explanation
};
};

module.exports = { calculateRisk };
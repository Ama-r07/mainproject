const express = require("express");
const { calculateRisk } = require("../services/riskService");
const { generateReport } = require("../services/reportService");

const router = express.Router();

router.get("/generate", async (req, res) => {
  const { uid, cid } = req.query;

  try {
    const result = await calculateRisk(uid, cid);

    const filePath = await generateReport(
      uid,
      cid,
      result.score,
      result.level,
      result.explanation
    );

    res.download(filePath);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to generate report");
  }
});

module.exports = router;
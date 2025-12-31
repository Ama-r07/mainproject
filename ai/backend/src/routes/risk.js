const express = require("express");
const { calculateRisk } = require("../services/riskService");

const router = express.Router();

router.get("/calculate", async (req, res) => {
  const { uid, cid } = req.query;

  if (!uid || !cid) {
    return res.status(400).json({ error: "Missing uid or cid" });
  }

  const result = await calculateRisk(uid, cid);
  res.json(result);
});

module.exports = router;
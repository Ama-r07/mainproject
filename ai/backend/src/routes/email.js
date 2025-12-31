const express = require("express");
console.log("📨 EMAIL ROUTE LOADED");

const { sendPhishingEmail } = require("../services/emailService");

const router = express.Router();

/**
 * Browser test endpoint
 * http://localhost:5050/api/send-test?email=x@y.com&uid=u1&cid=c1
 */
router.get("/send-test", async (req, res) => {
  const { email, uid, cid } = req.query;

  if (!email || !uid || !cid) {
    return res.send("Missing email, uid or cid");
  }

  try {
    await sendPhishingEmail(email, uid, cid);
    res.send("Test email sent successfully");
  } catch (err) {
    console.error("SMTP ERROR:", err);
    res.status(500).send("Email failed");
  }
});

module.exports = router;
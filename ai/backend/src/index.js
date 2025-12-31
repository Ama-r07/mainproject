require("dotenv").config();
console.log("🔥 INDEX.JS LOADED");

const express = require("express");
const cors = require("cors");
const reportRoutes = require("./routes/report");
const riskRoutes = require("./routes/risk");
const dashboardRoutes = require("./routes/dashboard");
const userRoutes = require("./routes/users");
const exportRoutes = require("./routes/export");

// IMPORT ROUTES
const trackRoutes = require("./routes/track");
const emailRoutes = require("./routes/email");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/dashboard", dashboardRoutes);
app.use("/report", reportRoutes);
app.use("/risk", riskRoutes);
app.use("/users", userRoutes);
app.use("/export", exportRoutes);

// MOUNT ROUTES
app.use("/track", trackRoutes);
app.use("/api", emailRoutes);

// ROOT CHECK
app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(5050, () => {
  console.log("Server running on port 5050");
});
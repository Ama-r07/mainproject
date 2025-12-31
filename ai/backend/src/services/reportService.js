const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateReport = (userId, campaignId, score, level, explanation) => {
  return new Promise((resolve, reject) => {
    const reportsDir = path.join(__dirname, "../reports");

    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const filePath = path.join(
      reportsDir,
      `report_${userId}_${Date.now()}.pdf`
    );

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc.fontSize(20).text("Phishing Awareness Report", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`User ID: ${userId}`);
    doc.text(`Campaign ID: ${campaignId}`);
    doc.text(`Risk Level: ${level}`);
    doc.text(`Risk Score: ${score}`);
    doc.moveDown();

    doc.text("Findings:");
    explanation.forEach((line, index) => {
      doc.text(`${index + 1}. ${line}`);
    });

    doc.end();

    // ✅ Wait until file is fully written
    stream.on("finish", () => {
      resolve(filePath);
    });

    stream.on("error", (err) => {
      reject(err);
    });
  });
};

module.exports = { generateReport };
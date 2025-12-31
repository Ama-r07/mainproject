const generateExplanation = (score, level, hasClicked, hasSubmitted) => {
  const points = [];

  if (hasClicked) {
    points.push("User clicked on the phishing link.");
  } else {
    points.push("User did not click on the phishing link.");
  }

  if (hasSubmitted) {
    points.push("User submitted credentials on the phishing page.");
  } else {
    points.push("User did not submit any credentials.");
  }

  if (level === "High") {
    points.push("High risk behavior detected. Immediate security awareness training recommended.");
  } else if (level === "Medium") {
    points.push("Moderate risk detected. User may need phishing awareness training.");
  } else {
    points.push("Low risk. User demonstrated good security awareness.");
  }

  return points;
};

module.exports = { generateExplanation };
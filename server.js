// server.js - simple Express API for ATS resume generator

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "2mb" }));

// Test route
app.get("/", (req, res) => {
  res.send("Server is working ✅");
});

// Example API endpoint
app.post("/api/generate", (req, res) => {
  const { resumeText, jdText } = req.body || {};

  if (!resumeText || !jdText) {
    return res.status(400).json({ error: "Provide resumeText and jdText in JSON body." });
  }

  const tailored = {
    title: "ATS Friendly Resume (mocked)",
    tailoredResumeMarkdown: `**Summary**\nTailored for JD: ${jdText.slice(0,120)}...\n\n**Experience**\nOptimized for ATS.`,
    sections: [
      { heading: "Summary", body: "ATS-optimized summary based on JD." },
      { heading: "Experience", body: "Rewritten experience section targeted to JD." }
    ]
  };

  res.json(tailored);
});

// Render requires PORT from env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
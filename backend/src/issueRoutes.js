const express = require("express");
const { getIssues } = require("../services/issueService");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const issues = await getIssues();

    res.json({
      success: true,
      data: issues,
    });
  } catch (error) {
    console.error("Failed to fetch issues:", error.message);

    res.status(500).json({
      success: false,
      error: "Failed to fetch issues",
    });
  }
});

module.exports = router;
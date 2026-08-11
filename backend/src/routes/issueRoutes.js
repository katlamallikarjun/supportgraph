const express = require("express");

const {
  getIssues,
  searchIssues,
  getTroubleshooting,
  getIssueById,
} = require("../services/issueService");

const router = express.Router();


// ==========================================
// GET ALL ISSUES
// GET /api/issues
// ==========================================
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


// ==========================================
// SEARCH ISSUES
// GET /api/issues/search?q=API
// ==========================================
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({
        success: false,
        error: "Search query is required",
      });
    }

    const issues = await searchIssues(q.trim());

    res.json({
      success: true,
      data: issues,
    });

  } catch (error) {
    console.error("Search failed:", error.message);

    res.status(500).json({
      success: false,
      error: "Search failed",
    });
  }
});


// ==========================================
// GET ISSUE TROUBLESHOOTING
// GET /api/issues/:issueId/troubleshooting
// ==========================================
router.get("/:issueId/troubleshooting", async (req, res) => {
  try {
    const { issueId } = req.params;

    const troubleshooting = await getTroubleshooting(issueId);

    if (!troubleshooting) {
      return res.status(404).json({
        success: false,
        error: "Issue not found",
      });
    }

    res.json({
      success: true,
      data: troubleshooting,
    });

  } catch (error) {
    console.error("Troubleshooting failed:", error.message);

    res.status(500).json({
      success: false,
      error: "Failed to fetch troubleshooting information",
    });
  }
});


// ==========================================
// GET SINGLE ISSUE
// GET /api/issues/:issueId
// ==========================================
router.get("/:issueId", async (req, res) => {
  try {
    const { issueId } = req.params;

    const issue = await getIssueById(issueId);

    if (!issue) {
      return res.status(404).json({
        success: false,
        error: "Issue not found",
      });
    }

    res.json({
      success: true,
      data: issue,
    });

  } catch (error) {
    console.error("Failed to fetch issue:", error.message);

    res.status(500).json({
      success: false,
      error: "Failed to fetch issue",
    });
  }
});


module.exports = router;
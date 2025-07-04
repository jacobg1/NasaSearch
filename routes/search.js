const express = require("express");
const router = express.Router();
const { makeSearch } = require("./utils/request");

router.get("/search/:query", async (req, res) => {
  try {
    const response = await makeSearch(req.params.query, req.query.page);
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    const errorMessage = err?.message || "Internal server error";
    res.status(500).json({ message: errorMessage });
  }
});

module.exports = router;

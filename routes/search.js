const express = require("express");
const router = express.Router();
const { makeSearch } = require("./utils/request");

router.get("/search/:query", async (req, res) => {
  try {
    const response = await makeSearch(req.params.query);
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to process request" });
  }
});

module.exports = router;

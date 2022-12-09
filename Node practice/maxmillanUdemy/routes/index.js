const express = require("express");

const router = express.Router();

router.get("/users", (req, res, send) => {
  res.send("route 1");
});

module.exports = router;

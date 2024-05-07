const express = require("express");
const { getTasks, addTask } = require("../controllers/task");
const router = express.Router();

router.get("/getTasks", getTasks);

router.post("/addTask", addTask);

router.delete("/delete/:taskId", addTask);

module.exports = router;

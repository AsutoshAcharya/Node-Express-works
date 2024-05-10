const express = require("express");
const { getTasks, addTask, deleteTask } = require("../controllers/task");
const router = express.Router();

router.get("/getTasks", getTasks);

router.post("/addTask", addTask);

router.delete("/delete/:taskId", deleteTask);

module.exports = router;

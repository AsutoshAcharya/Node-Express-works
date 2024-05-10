const express = require("express");
const {
  getTasks,
  addTask,
  deleteTask,
  moveTask,
} = require("../controllers/task");
const router = express.Router();

router.get("/getTasks", getTasks);

router.post("/addTask", addTask);

router.delete("/delete/:taskId", deleteTask);

router.patch("/move", moveTask);

module.exports = router;

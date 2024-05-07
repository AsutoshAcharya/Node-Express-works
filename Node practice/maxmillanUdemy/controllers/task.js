const Task = require("../models/task.js");

exports.getTasks = (req, res, next) => {
  Task.findAll()
    .then((tasks) => {
      console.log(tasks);
      res.send(tasks);
    })
    .catch((err) => console.log(err));
};
exports.addTask = (req, res, next) => {
  console.log("body", req.body);
  Task.create({
    title: req.body.title,
    status: req.body.status,
  })
    .then((result) => {
      res.status(200).send({ staus: 200, message: "Task Created" });
    })
    .catch((err) => res.status(400).send(err));
};

exports.deleteTask = (req, res, next) => {
  const taskId = req.params.taskId;
  Task.destroy({ where: { id: taskId } })
    .then((deletedRows) => {
      if (deletedRows > 0) {
        res
          .status(200)
          .send({ status: 200, message: "Task deleted successfully" });
      } else {
        res.status(404).send({ status: 404, message: "Task not found" });
      }
    })
    .catch((err) =>
      res
        .status(400)
        .send({ status: 400, message: "Task deletion failed", error: err })
    );
};

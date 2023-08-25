import express from "express";
import mongoose, { Schema, model } from "mongoose";
import bodyParser from "body-parser";
import date from "./date.js";

const app = express();
let port = 3000;

mongoose.connect("mongodb://127.0.0.1/toDoListDB");

const listSchema = new Schema({
  newItem: String,
});

const Task = model("Task", listSchema);

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  const tasks = await Task.find({});

  res.render("index", {
    date: date(),
    tasks: tasks,
  });
});

app.post("/post", (req, res) => {
  let newTask = req.body.newItem;
  if (newTask !== "") {
    const task = new Task({
      newItem: newTask,
    });
    task.save();
  }
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  let tasksCompleted = req.body.tasksCompleted;
  if (typeof tasksCompleted == "object") {
    tasksCompleted.forEach(async (taskId) => {
      await Task.deleteOne({ _id: taskId });
    });
  } else {
    await Task.deleteOne({ _id: tasksCompleted });
  }
  res.redirect("/");
});

/*app.post("/update", async (req, res) => {
  console.log(req.body);
  res.redirect("/");
});*/

app.listen(port, (req, res) => {
  console.log(`Server is running or port ${port}`);
});

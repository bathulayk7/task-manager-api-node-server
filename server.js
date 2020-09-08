//  import express from "express";
const express = require("express");
const Task = require("./models/Task");
const cors = require("cors");

const tasks = [
  new Task(1, "React", "UI"),
  new Task(2, "Reactjs", "UI Frontend"),
  new Task(3, "java", "backend"),
  new Task(4, "spring", "framework"),
];

const app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.send("<h1>Get Express works</h1>");
});
app.post("/", (req, res) => {
  res.send("<h1>Post Express works</h1>");
});
app.get("/tasks", (req, res) => {
  res.send(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  let task = null;
  for (let i in tasks) {
     if(tasks[i].id==id){
         task=tasks[i]
         break;
     }
  }
  res.send(task)
});
app.listen(3001, () => console.log("Server started!"));

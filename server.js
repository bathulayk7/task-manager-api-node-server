//  import express from "express";
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const Task = require("./models/Task");
const cors = require("cors");
const { buildSchema } = require("graphql");

const tasks = [
  new Task(1, "React", "UI"),
  new Task(2, "Reactjs", "UI Frontend",true),
  new Task(3, "java", "backend"),
  new Task(4, "spring", "framework"),
];

const app = express();
app.use(cors());
const schema=buildSchema(`
  type Task{
    id:ID
    title:String
    description:String
    completed:Boolean
    date:String
  }
  type Query{
    tasks:[Task]
    task(id: ID!):Task
  }
`)
const rootValue={
  tasks(){
    return tasks
  },
  task({id}){
    let task=null
    for (let i in tasks) {
      if (tasks[i].id == id) {
        task = tasks[i];
        break;
      }
    }  
    return task
  }
}
app.use("/api",graphqlHTTP({
  schema,
  rootValue,
 graphiql:true

}))
/* app.use("/api",graphqlHTTP({
  schema:buildSchema(`
 type Alert{
   color:String
   text:String
 }
  type Query{
       msg:Alert
     }
  `),
  rootValue:{
    msg: ()=>({color:"danger", text:"Hello world"})
},
  graphiql:true
})) */
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
    if (tasks[i].id == id) {
      task = tasks[i];
      break;
    }
  }
  res.send(task);
});
app.listen(3001, () => console.log("Server started!"));

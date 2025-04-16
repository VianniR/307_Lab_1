// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
  };
const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const findUserByJob = (job) => {
    return users["users_list"].filter(
      (user) => user["job"] === job
    );
  };

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = generateId();
  addUser(userToAdd);
  res.status(201).send(userToAdd);
});

app.get("/users", (req, res) => {
    const {name, job} = req.query;

    let result = users["users_list"]
    if (name != undefined) {
      result = findUserByName(name);
    } 
    
    if (job != undefined) {
      result = findUserByJob(job);
    }
    
      res.send({users_list: result});
    
    
  });

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  });

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    
    users["users_list"] = users["users_list"].filter((user) => user["id"] !== id);

    res.status(204).send();
  });

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});


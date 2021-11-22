const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");
const { handleRegistration } = require("./controllers/register");
const { handleSigninRequest } = require("./controllers/signin");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "uzair",
    password: "nimda321",
    database: "smartbrain",
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home");
});

app.post("/signin", (req, res) => handleSigninRequest(req, res, db, bcrypt));
app.post("/register", (req, res) => handleRegistration(req, res, db, bcrypt));
app.get("/profile/:id", (req, res) => getProfile(req, res, db));
app.put("/image", (req, res) => onImageSubmit(req, res, db));

app.listen(3010, () => {
  console.log("Server Running on Port 3010");
});

/*
 ================= INITIAL API SCHEME==================
 */

/*

'/'                   --> GET     res => 'This is working'
'/signin'             --> POST    res => 'success'/'fail'
'/register'           --> POST    res => new User
'/profile/:userId'    --> GET     res => user
'/image'              --> PUT     ==> update user

*/

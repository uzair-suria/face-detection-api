const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");
const { handleRegistration } = require("./controllers/register");
const { handleSigninRequest } = require("./controllers/signin");
const { onImageSubmit, handleApiCall } = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home");
});
app.get("/db", (req, res) => handleDbRequest(req, res, db));
app.post("/signin", (req, res) => handleSigninRequest(req, res, db, bcrypt));
app.post("/register", (req, res) => handleRegistration(req, res, db, bcrypt));
app.get("/profile/:id", (req, res) => getProfile(req, res, db));
app.put("/image", (req, res) => onImageSubmit(req, res, db));
app.post("/imageurl", (req, res) => handleApiCall(req, res));

app.listen(process.env.PORT || 3010, () => {
  console.log(
    `Server Running on Port ${process.env.PORT ? process.env.PORT : 3010}`
  );
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

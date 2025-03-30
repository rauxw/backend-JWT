require("dotenv").config();

const express = require("express");

const jwt = requrie("jsonwebtoken");

const { Admin, Course } = require("../db/db");

const adminRouter = express.Router();

adminRouter.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
});

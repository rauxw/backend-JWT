require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const { User, Course } = require("../db/db");
const userMiddleware = require("../middlewares/user");

const JWT_KEY = process.env.JWT_USER;

userRouter.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({
      message: "User Already Exists",
    });
  }

  await User.create({
    username,
    password,
  });
  res.status(201).json({
    message: "You are signed up",
  });
});

userRouter.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({
    username,
    password,
  });

  if (user) {
    const token = jwt.sign({ username }, JWT_KEY);
    res.status(201).json({
      token: token,
    });
  } else {
    return res.status(400).json({
      message: "Incorrect Username and Password",
    });
  }
});

userRouter.get("/course", async (req, res) => {
  const course = await Course.find({});
  res.status(201).json({
    message: course,
  });
});

userRouter.post("/course/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const username = req.username;
  console.log("Username from middleware:", username);
  console.log("Course ID:", courseId);
  try {
    await User.updateOne(
      { username },
      { $push: { purchasedCourses: courseId } }
    );
  } catch (err) {
    return res.status(400).json({
      message: "Course purchase Failed",
      error: err.message,
    });
  }
  res.status(200).json({
    message: "Course Purchased successfully",
  });
});

module.exports = userRouter;

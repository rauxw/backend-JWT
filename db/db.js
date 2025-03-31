const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.ObjectId, ref: "Course" }],
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageLink: String,
  price: Number,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const app = express();
const PORT = process.env.SERVER_PORT;
const MONGO_DB = process.env.MONGO_URL;

app.use(bodyParser.json());
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);

async function main() {
  try {
    await mongoose.connect(MONGO_DB);
    console.log(`Connected to Database `);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
}

main();

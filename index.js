const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userController = require("./Routes/userRoutes");
const signupLoginController = require("./Routes/signupLoginRoutes");
// const port = 3500;
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();



const port = process.env.PORT || 3500;

mongoose
  .connect(process.env.MONGODB_URI, {
 
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("Successfully connected to the database!");
    app.listen(port, () => {
      console.log(`Listening to server at port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Real Estate Backend server");
});

app.use(userController);
app.use(signupLoginController); 
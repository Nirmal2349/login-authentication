const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./schema");
const jwt = require("jsonwebtoken");

app.use(express.json());

const priv_key = "nirmal_Project_auth";

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });
app.use(
  cors({
    origin: "http://127.0.0.1:3000/",
  })
);

app.post("/api/signup", async (req, res) => {
  const body = req.body;
  console.log(body);
  const checkUser = await User.findOne({ emailAddress: body.emailAddress });
  if (!checkUser) {
    const newUser = await User.create({
      emailAddress: body.emailAddress,
      password: body.password,
      firstname: body.firstname,
      lastname: body.lastname,
    });
    console.log(newUser);
    res.status(200).json({ success: true, msg: "account created sucessfull" });
  } else {
    res
      .status(401)
      .json({ success: false, msg: "Email Address already registered" });
  }
  console.log(checkUser);
});

app.post("/api/login", async (req, res) => {
  const body = req.body;
  const checkUser = await User.findOne({ emailAddress: body.emailAddress });
  if (checkUser) {
    if (checkUser.password == body.password) {
      const token = jwt.sign(
        {
          userId: checkUser._id,
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        priv_key
      );
      res.status(200).json({ success: true, msg: "Login Successful", token });
    } else {
      res.status(401).json({ success: false, msg: "Incorrect password" });
    }
  } else {
    res
      .status(401)
      .json({ success: false, msg: "Please enter valid email address" });
  }
});

app.get("/api/profile", authenticateUser, async (req, res) => {
  console.log(req.userId);
  console.log(await User.findById(req.userId));
  res.json({ ok: true, msg: "profile page" });
});

app.get("/api/logout", (req, res) => {
  console.log(req);
  res.json({ ok: true, msg: "login page sucess" });
});

// Started a server at port
app.listen(process.env.PORT, () => {
  console.log(`Listening at ${process.env.PORT}`);
});

async function authenticateUser(req, res, next) {
  const token = req.headers.authorization;
  try {
    const payload = jwt.verify(token, priv_key);
    const checkUser = await User.findById(payload.userId);
    if (checkUser) {
      req.userId = payload.userId;
      next();
    } else {
      res.status(401).json({
        success: false,
        msg: "User not found",
      });
    }
  } catch (err) {
    res.status(401).json({
      success: false,
      msg: "Invalid token",
    });
  }
}

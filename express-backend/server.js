const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt"); // add salt every time so every hash is different
const mongoose = require("mongoose");

require("dotenv").config(); // store in .env file for security and privacy
const mongodb_link = process.env.MONGODB_LINK;

const app = express();

// connect to mongodb
mongoose
  .connect(mongodb_link, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const db = mongoose.connection;

const User = mongoose.model("User", {
  username: String,
  password: String,
  isAdmin: Boolean,
});

app.use(express.json()); // analyze json data for post, put and delete, etc.

app.use(cors());

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 means complexity
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      isAdmin: req.body.isAdmin || false,
    });
    await user.save();

    res.status(201).send("User created"); // 201 -> create new resource
  } catch {
    res.status(500).send("Error creating user"); // 500 -> server error
  }
});

// why use spring boot more than express currently?
app.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).send("User not found"); // 400 -> bad request, can't meet the request
  }

  if (await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign(
      { username: user.username, isAdmin: user.isAdmin },
      "secret",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } else {
    res.status(401).send("Unauthorized"); // unauthorized
  }
});

app.get("/dashboard", authorize, (req, res) => {
  if (req.user.isAdmin) {
    return res.json({ message: "Admin dashboard" });
  } else {
    return res.json({ message: "User dashboard" });
  }
});

function authorize(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // add bearer to indicate it's token
    const decodedToken = jwt.verify(token, "secret");
    req.user = decodedToken;

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).send("Token Expired");
    } else {
      console.log("Invalid Token");
    }
  }
}

app.listen(3000, () => console.log("Server started"));

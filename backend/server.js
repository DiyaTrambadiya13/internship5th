const express = require("express");
const mysql = require("mysql");
const session = require("express-session");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "ielts",
});

app.get("/", (req, res) => {
  return res.json("Backend running");
});

app.post("/authenticated", (req, res) => {
  if (req.session.loggedIn || req.headers.authorization === 'Bearer yourAuthTokenHere') {
    return res.json({ authenticated: true });
  } else {
    return res.json({ authenticated: false });
  }
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const sql = "INSERT INTO Users (Email, password) VALUES (?, ?)";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "An error occurred while registering the user" });
    }
    return res.json({ message: "User registered successfully" });
  });
});

app.post("/dashboard", (req, res) => {
  return res.json("dashboard running");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "An error occurred while logging in" });
    }
    if (results.length > 0 && (email !== "" || password !== "")) {
      req.session.loggedIn = true;
      return res.json("Success");
    } else {
      return res.json("Fail");
    }
  });
});
app.post("/logout", (req, res) => {
  // Destroy user session
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "An error occurred while logging out" });
    }
    return res.json("Logged out");
  });
});
app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});

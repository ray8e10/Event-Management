require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./configs/connectDB");
const expressLayouts = require("express-ejs-layouts");
const passport = require("./configs/passport");
const session = require("express-session");

const app = express();

connectDB();

app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes/indexRoutes"));
app.use("/event", require("./routes/eventRoutes"));

app.listen(4000, () => {
  console.log("server running");
});

require("dotenv").config();

const express = require("express");
const session = require("express-session"); //used to handle session management
const cookieParser = require("cookie-parser");//helps parse cookie
const csurf = require("csurf");//provides CSRF protection
const path = require("path");


const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));



// app.use("/auth", authRoutes);
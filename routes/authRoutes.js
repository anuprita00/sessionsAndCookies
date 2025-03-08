const express = require('express');
const bcrypt = require('bcryptjs');
const User = require("../models/User");
const { ensureAuthenticated } = require('../middleware/authMiddleware');


const router = express.Router();

//Register
router.get("/register", (req, res) => res.status(200));

router.post("/register", async (req, res) => {
    const {username, password} = req.body;
    const user = new User({username, password});
    await user.save(); 

    res.redirect('/auth/login');
});

//login
router.get('/login', (req, res) => res.status(200));

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({ username });

    if(!user || !(await bcrypt.compare(password, user.password))){
        res.status(401).send('Invalid credentials');
    }

    // Store user details in session after successful login
    req.session.user = { id: user._id, role: user.role };

    req.redirect("/auth/dashboard");

});

//Dashboard (Protected Route) 
router.get("/dashboard",ensureAuthenticated, (req, res) => {
    res.render("dashboard", { user: req.session.user });
// Renders the dashboard.ejs template.
// Passes the user object (req.session.user) to the template, so it can display user-specific data.
});
//(req, res) => { ... } → The callback function that renders the dashboard page.


//Logout
router.get("/logout", (req, res) => {
//This logs out the user by making their session invalid.
    router.session.destroy(() => { //removes all session data for the user.
      
// Deletes the session cookie (connect.sid), which is used to track the user’s session.
// connect.sid is the default cookie name used by express-session.
        res.clearCookie("connect.sid");
        res.redirect("/auth/login");
    });
});

module.exports = router;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["user, admin"],
        default: "user"
    }
});

//This is a pre-save middleware function for a Mongoose schema (UserSchema).
//It runs before (pre) saving a document to the database.
//It ensures the password is hashed before being stored.

UserSchema.pre("save", async function (next){
//this.isModified("password") checks if the password field has been changed.
//if password is not modified it skips hashing and moves to next middleware
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
//bcrypt.hash() to encrypt the password.
//(10) is the salt rounds (higher means stronger encryption but slower processing).
//The result is a hashed version of the password, which replaces the plain-text password.
    next();
});

modules.exports = mongoose.model("User", UserSchema);
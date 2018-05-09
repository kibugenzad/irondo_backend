const express = require("express");
const app = express();
const bcrypt = require('bcrypt'),SALT_WORK_FACTOR = 10;
const validator = require("validator");
const isEmpty = require('lodash/isEmpty');

//import schema
const Users = require("../models/Users");

//validate input
function validateInput(data){
    var errors = {};


    if(isEmpty(data.username)){
        errors.username = 'Invalid username'
    }
    if(data.username.length < 6){
        errors.username = 'Username is too short'
    }

    if(data.password.length < 6) {
        errors.password = "Error: Password should have at least six characters!";
    }
    if(data.password == data.username) {//or username
        errors.password = "Error: Password should be different from the email!";
    }
    let re = /[0-9]/;
    if(!re.test(data.password)) {
        errors.password = "Error: password should have at least one number (0-9)!";
    }
    re = /[a-z]/;
    if(!re.test(data.password)) {
        errors.password = "Error: password should have at least one lowercase letter (a-z)!";
    }
    return {
        errors,
        isValid : isEmpty(errors)
    }
}

//create account step 1
app.post("/login", function (req, res, next) {
    const {errors,isValid} = validateInput(req.body);
    if (!isValid){
        res.status(400).json(errors)
    }else{
        // fetch user and test password verification
        Users.findOne({ username: req.body.username }, function(err, user) {
            if (err) throw err;
            if (user != null){
                bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
                    if (err){
                        return res.status(400).json({error: err})
                    }
                    return res.status(200).json({success: isMatch, user_key: user._id, email: user.email, fullname: user.firstname+" "+user.lastname, profile_image: user.profile_image})
                });
            }else{
                return res.status(400).json({status: 'This account is not found'})
            }
        }).catch(next);
    }
});

module.exports = app;
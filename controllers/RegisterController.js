const express = require("express");
const app = express();
const validator = require("validator");
const isEmpty = require('lodash/isEmpty');

//import schema
const Users = require("../models/Users");

//validate input
function validateInput(data){
    var errors = {};

    if(isEmpty(data.firstname)){
        errors.firstname = 'First name is required'
    }

    if(isEmpty(data.lastname)){
        errors.lastname = 'Last name is required'
    }

    if(isEmpty(data.email)){
        errors.email = 'Email address is required'
    }else if (!validator.isEmail(data.email)){
        errors.email = 'Invalid Email address'
    }

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
app.post("/register", function (req, res, next) {
    const {errors,isValid} = validateInput(req.body);
    if (!isValid){
        res.status(400).json(errors)
    }else {
        Users.create(req.body).then(user => {
            res.status(200).json({user})
        }).catch(next);
    }
});

module.exports = app;
const express = require("express");
const app = express();
var fs = require('fs')
var cloudinary = require('cloudinary');

//import schema
const CreditScores = require("../models/CreditScores");
const Users = require("../models/Users");

//create account step 1
app.get("/creditScores", function (req, res, next) {
    CreditScores.find({}).limit(2000).then(data => {
        res.status(200).json(data);
    }).catch(next)
});

//search
app.get("/scores/:q", function (req, res, next) {
    const re = new RegExp(req.params.q, "i");
    CreditScores.find().or([{ 'Name': { $regex: re }}, { 'IDNumber': { $regex: re }}, { 'AccountNumber': { $regex: re }}]).limit(100).then(scores =>{
        res.status(200).json(scores);
    }).catch(next);
});

//dispaprove
app.put("/disaproveLoan/:id", function (req, res, next) {
    CreditScores.findByIdAndUpdate({_id: req.params.id}, {disapprove: true}).then(scores => {
        CreditScores.find({}).limit(2000).then(data => {
            res.status(200).json(data);
        }).catch(next)
    }).catch(next);
});

//approve
app.put("/approveLoan/:id", function (req, res, next) {
    CreditScores.findByIdAndUpdate({_id: req.params.id}, {disapprove: false}).then(scores => {
        CreditScores.find({}).limit(2000).then(data => {
            res.status(200).json(data);
        }).catch(next)
    }).catch(next);
});
app.post('/uploadImage', (req, res, next) => {
    let imageFile = req.files.file;
    let filename = req.body.id;

    cloudinary.config({
        cloud_name: 'dwqhmch33',
        api_key: '762865677562485',
        api_secret: 'F1k0tpJycyoc-InmbHghWtgVB5w'
    });

    imageFile.mv(`${__dirname}/public/${filename}.jpg`, function(err) {
        if (err) {
            console.log(err)
            return res.status(500).send(err);
        }
        cloudinary.uploader.upload(`${__dirname}/public/${filename}.jpg`, function(result) {
            //update database
            Users.findByIdAndUpdate({_id: req.body.id}, {profile_image: result.url}).then(user => {
                Users.findOne({_id: req.body.id}).then(user => {
                    console.log(user.profile_image)
                    res.json({profile_image: user.profile_image});
                })
            }).catch(next)
        });
    });

})

module.exports = app;
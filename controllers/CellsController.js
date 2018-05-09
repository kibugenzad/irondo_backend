const express = require("express");
const app = express();

//import schema
const Sectors = require("../models/sectors");

app.post("/addSectors", function (req, res, next) {
    Sectors.create(req.body).then(sector => {
        res.status(200).json({sector})
    }).catch(next);
});

app.get("/getAllSectors", function (req, res, next) {
    Sectors.find({}).then(sector => {
        res.status(200).json({sector})
    }).catch(next);
});

module.exports = app;
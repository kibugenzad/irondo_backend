const express = require("express");
const app = express();

//import schema
const Cells = require("../models/Cells");

app.post("/addCells", function (req, res, next) {
    Cells.create(req.body).then(cells => {
        res.status(200).json({cells})
    }).catch(next);
});

app.get("/getAllCells", function (req, res, next) {
    Cells.find({}).then(cells => {
        res.status(200).json({cells})
    }).catch(next);
});

module.exports = app;
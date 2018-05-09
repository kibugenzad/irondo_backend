const express = require("express");
const app = express();

//import schema
const Sectors = require("../models/sectors");
const Cells = require("../models/Cells");

app.post("/addCells", function (req, res, next) {
    if (req.body.sector != undefined || req.body.sector != null){
        Sectors.findOne({sector: req.body.sector}).then(function (sector) {
            if (sector != null){
                Cells.create({
                    sector: sector._id,
                    cell: req.body.cell
                }).then(cells => {
                    res.status(200).json({cells})
                }).catch(next);
            }
        })
    }
});

app.get("/getAllCells", function (req, res, next) {
    Cells.find({}).then(cells => {
        res.status(200).json({cells})
    }).catch(next);
});

module.exports = app;
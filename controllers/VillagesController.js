const express = require("express");
const app = express();

//import schema
const Villages = require("../models/Villages");
const Sectors = require("../models/sectors");
const Cells = require("../models/Cells");

app.post("/addVillages", function (req, res, next) {
    Sectors.findOne({sector: req.body.sector}).then(function (sector) {
        if (sector != null){
            Cells.findOne({cell: req.body.cell}).then(function (cell) {
                if (cell != null){
                    Villages.create({
                        sector: sector._id,
                        cell: cell._id,
                        villages: req.body.village
                    }).then(villages => {
                        res.status(200).json({villages})
                    }).catch(next);
                }
            })
        }
    })
});

app.get("/getAllVillages", function (req, res, next) {
    Villages.find({})
        .populate({path: 'sector', model: Sectors})
        .populate({path: 'cell', model: Cells})
        .then(villages => {
        res.status(200).json({villages})
    }).catch(next);
});

module.exports = app;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CellsSchema = new Schema({
    sector:{
        type: String,
        required: [true, "Sector must not be empty"]
    },
    cell:{
        type: String,
        required: [true, "Cell must not be empty"]
    },
    timestamps: {
        type : Date,
        default: Date.now
    }
});

const Cells = mongoose.model("Cells", CellsSchema);

module.exports = Cells


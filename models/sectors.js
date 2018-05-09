const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SectorsSchema = new Schema({
    district:{
        type: String
    },
    province:{
        type: String
    },
    sector:{
        type: String,
        required: [true, "Sector must not be empty"]
    },
    timestamps: {
        type : Date,
        default: Date.now
    }
});

const Sectors = mongoose.model("Sectors", SectorsSchema);

module.exports = Sectors


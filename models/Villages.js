const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VillagesSchema = new Schema({
    sector:{
        type: [{ type: Schema.Types.ObjectId, ref: 'sectors' }],
        required: [true, "Sector must not be empty"]
    },
    cell:{
        type: [{ type: Schema.Types.ObjectId, ref: 'cells' }],
        required: [true, "Cell must not be empty"]
    },
    villages:{
        type: String,
        required: [true, "Villages must not be empty"]
    },
    timestamps: {
        type : Date,
        default: Date.now
    }
});

const Villages = mongoose.model("Villages", VillagesSchema);

module.exports = Villages


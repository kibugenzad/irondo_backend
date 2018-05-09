const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CreditScoresSchema = new Schema({
    Name:{
        type: String,
        required: [true, "Please specify the names is"]
    },
    IDNumber:{
        type: String,
        required: [true, "Please specify ID Number"]
    },
    AccountNumber:{
        type: String,
        required: [true, "Please specify Account Number"]
    },
    DOB:{
        type: Date
    },
    CreditScore:{
        type: Number,
        default: 0.0
    },
    Amount: {
        type : Number,
        default: 0
    },
    disapprove: {
        type : Boolean,
        default: false
    }
});

const CreditScores = mongoose.model("credit_scores", CreditScoresSchema);

module.exports = CreditScores


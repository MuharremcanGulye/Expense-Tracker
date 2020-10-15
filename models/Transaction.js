const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    text : {
        type: String,
        trim : true,
        required : [true , "Please Add Text"]
    },
    amount : {
        type : Number,
        required: [true , "Please Add an Amount"]
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("Transaction",TransactionSchema);
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    hostid: {
        type: mongoose.Schema.Types.ObjectId 
    },
    TimeIn: {
        type: Date,
        default: Date.now
    },
    TimeOut: {
        type: Date
    },
    OTP: {
        type: String
    }
})

const visitor = mongoose.model("visitor", userSchema);
module.exports = visitor
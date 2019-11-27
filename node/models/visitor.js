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
    address: {
        type: String 
    },
    TimeIn: {
        type: Date,
        default: Date.now
    },
    TimeOut: {
        type: Date
    }
})

const visitor = mongoose.model("visitor", userSchema);
module.exports = visitor
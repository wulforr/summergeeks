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
    contact: {
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
        type: Number
    }
    
})

const visitor = mongoose.model("visitor", userSchema);
module.exports = visitor
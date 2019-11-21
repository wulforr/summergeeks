var express = require('express')
var app = express()
var mongoose = require('mongoose')
const router = express.Router();

const visitor  = require('./models/visitor')

app.listen(5000,() => {console.log("server started")})

app.use(express.urlencoded({ extended: false,limit: '50mb' }));
app.use(express.json({limit: '50mb'}));

const db = require("./config/keys").mongoURI;
mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))

app.get('/', (req,res) => {

    res.send("test")
})
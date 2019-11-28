var express = require('express')
var app = express()
var mongoose = require('mongoose')
const router = express.Router();
const nodemailer = require("nodemailer");
const sendinfo = require('./sendinfo')
var cors = require('cors');
app.use(cors());

app.listen(5000,() => {console.log("server started")})

app.use(express.urlencoded({ extended: false,limit: '50mb' }));
app.use(express.json({limit: '50mb'}));

// To remove cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// Importing models of visitor and host
const visitor  = require('./models/visitor')
const host = require('./models/host')

// Importing Mongo Key from Config , you will have to put your own key here
const db = require("./config/keys").mongoURI;

// establishing connection to database
mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))

// A test route
app.get("/",(req,res)=>{
    res.json({output:'testing'})
})

// The checkin Route
app.post('/checkin', (req,res) => {

    // console.log(req)
    // Adding the details of visitor to database
    const newVisitor = new visitor({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        hostid:req.body.hostdetails
    })
    newVisitor.save()
    .then(ans => 
    {
        console.log("saved")
        host.find({_id:req.body.hostdetails})
        .then(host => {
            console.log("host found")
            sendinfo.toHost(host[0].email , host[0].phone, ans)
            res.status(200).json(ans)
        })
        .catch(err => res.status(400).json(err))
        // console.log(req.body.hostdetails)
        
    })
    .catch(err => res.status(400).json(err))
    // res.send('test')
})

// The checkout route
app.post('/checkout', (req,res) => {
    // Finding the visitor using its id and then updating the checkout time in it
    visitor.find({_id:req.body.id})
    .then(intern => {
        console.log(intern,intern[0].OTP,req.body)
        if(intern[0].OTP == req.body.otp)
        {
            visitor.updateOne({_id:req.body.id},{$set:{TimeOut:Date.now()}})
            .then(user => {
                console.log(intern[0].hostid)
                host.find({_id:intern[0].hostid})
                .then(host => {
                    console.log(host)
                    sendinfo.toVisitor(intern[0],host[0])
                    res.json(user)
                })

            })
            .catch(err => res.json(err))
        }
        else
            res.status(202).json('didnt match')
    })
    
})

// Route to get all the hosts
app.get('/allhosts' ,(req,res) => {
    host.find({})
    .then(hosts => res.json(hosts))
})
// Route to get all the checkin Visitiors
app.get('/allvisitors',(req,res) => {
    // As we dont provide Timeout at the time of checkin hence Timeout is undefined for all the checkedin User
    visitor.find({TimeOut : undefined})
    .then(visitors => res.json(visitors))
})

app.post('/sendotp',(req,res) => {
    function generateOTP() { 
          
        // Declare a digits variable  
        // which stores all digits 
        var digits = '0123456789'; 
        let OTP = ''; 
        for (let i = 0; i < 4; i++ ) { 
            OTP += digits[Math.floor(Math.random() * 10)]; 
        } 
        return OTP; 
    } 
    var otp = generateOTP()
    console.log(otp)
    visitor.find({_id:req.body.id})
    .then(intern => {
        console.log('found')
        visitor.updateOne({_id:req.body.id},{$set:{OTP: otp}})
        .then(user => {
            console.log('updated')
            sendinfo.sendotp(intern[0].phone,otp)
            res.status(200).json("otp sent")
    })
    })
})
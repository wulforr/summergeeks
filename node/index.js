var express = require('express')
var app = express()
var mongoose = require('mongoose')
const router = express.Router();
const nodemailer = require("nodemailer");

const visitor  = require('./models/visitor')
const host = require('./models/host')

app.listen(5000,() => {console.log("server started")})

app.use(express.urlencoded({ extended: false,limit: '50mb' }));
app.use(express.json({limit: '50mb'}));

const db = require("./config/keys").mongoURI;
mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))

app.get("/",(req,res)=>{
    res.json('testing')
})

app.post('/checkin', (req,res) => {
    const newVisitor = new visitor({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        TimeOut:req.body.timeout
    })
    newVisitor.save()
    .then(ans => res.json(ans))
    .catch(err => res.json(err))

    // res.send('test')
})

app.post('/checkout', (req,res) => {
    // visitor.find({TimeOut : undefined})
    visitor.find({name:req.body.name})
    .then(intern => {
        if(intern.email === req.body.email)
        {
            visitor.updateOne({name:req.body.name},{$set:{TimeOut:Date.now()}})
    .then(user => {
        // user.TimeOut = Date.now
        // user.save()
        res.json(user)
    })
    .catch(err => res.json(err))
        }
        else
            res.json('didnt match')
    })
    
})


app.get('/sendmail',(req,res) => {
    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        // let testAccount = await nodemailer.createTestAccount();
      
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.mailtrap.io",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: '2660ddfea85629', // generated ethereal user
            pass:  '85185cd6ee61ae'// generated ethereal password
          }
        });
        // let transport = nodemailer.createTransport(options[, defaults])


        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Fred Foo 👻" <wulforr@gmail.com>', // sender address
          to: "wulforr@gmail.com, gsshaurya@gmail.com", // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: "<b>Hello world?</b>" // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        res.send('mail sent')
      }
      
      main().catch(console.error);
      
})

app.post('/crehost' ,(req,res) => {
    const newhost = new host({
        name: 'Shaurya1',
        phone: 8299352855,
        email:'wulforr@gmail.com',
        city: 'noida'
    })
    newhost.save()
    .then(data => res.json(data))
    // res.json(newhost)
})

app.get('/allhosts' ,(req,res) => {
    host.find({})
    .then(hosts => res.json(hosts))
})

app.get('/allvisitors',(req,res) => {
    visitor.find({TimeOut : undefined})
    .then(visitors => res.json(visitors))
})
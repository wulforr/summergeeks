const nodemailer = require("nodemailer");
const Nexmo = require('nexmo');
const apiKey = require("./config/keys").nexmoapiKey;
const apiSecret = require("./config/keys").nexmoapiSecret;
const User = require("./config/keys").nodemailerUser;
const Pass = require("./config/keys").nodemailerPass;


async function toHost(reciever, recieverNo, mailbody) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: User,
            pass: Pass
        }
    });
    const nexmo = new Nexmo({
        apiKey: apiKey,
        apiSecret: apiSecret,
    });
    //get date
    let k;
    let t = ''
    if (mailbody.TimeIn.getHours() > 12) {
        k = mailbody.TimeIn.getHours() - 12
        t = 'PM'
    } else {
        k = mailbody.TimeIn.getHours()
        t = 'AM'
    }
    min = mailbody.TimeIn.getMinutes()
    var FinalDate = `${k}:${min} ${t} IST`
    console.log(FinalDate)
    //message
    htmlData = `<h2>You have a new visitor</h2>
    <p>Name: ${mailbody.name} </p>
    <p>Email: ${mailbody.email} </p>
    <p>Phone: ${mailbody.phone} </p>
    <p>Checkin Time: ${FinalDate} </p>`
    // send mail with defined transport object
    console.log('sending mail')
    await transporter.sendMail({
        from: 'gsshaurya@gmail.com',
        to: reciever,
        subject: 'New visitor alert',
        html: htmlData
    })
        .then(info => console.log('Email sent: ' + info.response))
        .catch(err => console.log(err))

    const from = 'Nexmo';
    const to = recieverNo.toString();
    console.log(to)
    const text = `There is a new visitor for you
Name: ${mailbody.name}
Email: ${mailbody.email}
Phone:${mailbody.phone}
Checkin Time: ${FinalDate}`;

    nexmo.message.sendSms(from, to, text);

}

async function toVisitor(mailbody, hostdetails) {
    console.log('hey',mailbody)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: User,
            pass: Pass
        }
    });
    const nexmo = new Nexmo({
         apiKey: apiKey,
        apiSecret: apiSecret,
    });
    //get date
    let k;
    let t = ''
    if (mailbody.TimeIn.getHours() > 12) {
        k = mailbody.TimeIn.getHours() - 12
        t = 'PM'
    } else {
        k = mailbody.TimeIn.getHours()
        t = 'AM'
    }
    min = mailbody.TimeIn.getMinutes()
    var FinalDate = `${k}:${min} ${t} IST`
    var f= new Date()
    if (f.getHours() > 12) {
        k = f.getHours() - 12
        t = 'PM'
    } else {
        k = f.getHours()
        t = 'AM'
    }
    min = f.getMinutes()
    var CheckOutTime = `${k}:${min} ${t} IST`
    //message
    console.log(CheckOutTime)
    htmlData = `<h2>Here is your Visit Detail to Innovacer</h2>
    <p>Name: ${mailbody.name}</p>
    <p>Email: ${mailbody.email}</p>
    <p>Phone: ${mailbody.phone}</p>
    <p>HostName: ${hostdetails.name}</p>
    <p>Address: ${hostdetails.city}</p>
    <p>Checkin Time: ${FinalDate}</p>
    <p>Checkout Time: ${CheckOutTime}</p>`
    // send mail with defined transport object
    await transporter.sendMail({
        from: 'gsshaurya@gmail.com',
        to: mailbody.email,
        subject: 'Innovacer Visit Details',
        html: htmlData
    })
        .then(info => console.log('Email sent: ' + info.response))
        .catch(err => console.log(err))

    const from = 'Nexmo';
    const to = mailbody.phone.toString();
    console.log(to)
    const text = `The details of your visit to Innovacer are: 
Name: ${mailbody.name}
Phone:${mailbody.phone}
Checkin Time: ${FinalDate}
Checkout Time: ${CheckOutTime}`;
    console.log('sending text',text)
    nexmo.message.sendSms(from, to, text);
    console.log('text sent')

}

async function sendotp(number,otp) {
    const from = 'Nexmo';
    const to = number.toString();
    console.log(to)
    const text = `Your OTP for checking out is ${otp} `
    console.log('sending text',text)
    const nexmo = new Nexmo({
        apiKey: apiKey,
       apiSecret: apiSecret,
   });
    nexmo.message.sendSms(from, to, text);
    console.log('text sent')
}

sendInfo = {
    toHost,
    toVisitor,
    sendotp
}
module.exports = sendInfo
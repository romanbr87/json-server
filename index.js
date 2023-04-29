require('dotenv').config();
const path = require('path');
var logger = require('morgan');
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const nocache = require("nocache");
const fs = require('fs');
const {app, server} = require ("./server");
require('dotenv').config();
/*const db = require ('./db')
const categories = require ('./server/models/categories.model').categoriesModel;
const subCategories = require ('./server/models/subCategories.model').subCategoriesModel;*/

const rawdata = fs.readFileSync('db.json');
let jsonDB = JSON.parse(rawdata, null, 2);
//var jsonDB = require ('./db.json');

app.get('/favicon.ico', function(req, res, next) { 
    res.sendStatus(204); 
    //next();
});
  
app.use(cors({ origin: "*", credentials: true, optionSuccessStatus:200 }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false }));
app.use(nocache());
app.use(logger('dev'));

function sendMail(email, subject, body, req, res) {  
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
          auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });
          
    const mailOptions = {
        to: 'drushimgalil@gmail.com',
        from: email,
        subject: subject,
        text: body
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) { 
            console.error (error);
            res.status(500).send("המייל לא נשלח");
        }
        
        else {
          console.log('Email sent: ' + info.response);
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          res.send("המייל נשלח בהצלחה");
        }
    });
        
}
  
const verifyData = (data, res, next) => (!data) ? next() : res.json(data); 

app.get('/*', function(req, res, next) {
    res.status(404).json ({ status: 404, message: "הדף לא קיים"})
})

app.use(function(req, res, next) { 
    if (req.method == 'POST' && req.body.key !== process.env.API_KEY) res.status(404).json (null)
    
    else next();
});

app.post('/mail', function(req, res, next) {
    const mailDetails = (req.body);
    var {email, subject, body, name, tel} = mailDetails;
    if (name.trim() == '') name = undefined;
    if (tel.trim() == '') tel = undefined;
    const mail = `Message from ${name} tel: ${tel}\n ${body.trim()}`
    sendMail(email, subject, mail, req, res);
})  

app.post('/report', function(req, res, next) {
    const {report, name} = (req.body);
    const mail = `Report for ${name}\n ${report}`
    sendMail("romanbr@walla.com", 'report', mail, req, res);
})  

app.post('/neworg', function(req, res, next) {
    const { name, link1, link2, link3, facebook_link1, facebook_link2,
        linkedIn_link, instagram_link, email1, email2, tel1, tel2, whatsapp, region, message } = (req.body);

        const details = {
            site_name: name,
            link1: link1,
            link2: link2,
            link3: link3,
            facebook_link1: facebook_link1,
            facebook_link2: facebook_link2,
            linkedIn_link: linkedIn_link,
            instagram_link: instagram_link,
            email1: email1,
            email2: email2,
            tel1: tel1,
            tel2: tel2,
            whatsapp: whatsapp,
            region: region,
          };
  
          const email = `${JSON.stringify(details, null, 2)}\n ${message}`
    sendMail('romanbr@walla.com', 'new organization', email, req, res);
})  

app.post('/catNames', function(req, res, next) { 
    res.json(jsonDB.job.map (e => e.name)); 
});

app.post('/totalNum', function(req, res, next) { 
    const totalNum = jsonDB.job.reduce((acc,element) => 
    acc +  element.links.reduce ((acc1, element1) => acc1 + element1.links.length, 0), 0)
    
    res.json(totalNum); 
});

app.post('/', function(req, res, next) { 
    res.json(jsonDB.job); 
});

app.post('/:id/catName', function(req, res, next) { 
    verifyData(jsonDB.job[req.params.id].links.map (e => e.cat), res, next);
});

app.post('/:id/catTotalNum', function(req, res, next) { 
    verifyData(jsonDB.job[req.params.id].links.reduce ((acc1, element1) =>  acc1 + element1.links.length, 0)
    , res, next);
});


app.post('/:id', function(req, res, next) { 
    verifyData(jsonDB.job[req.params.id], res, next);
});

app.post('/:id1/:id2/subCatTotalNum', function(req, res, next) { 
    verifyData(jsonDB.job[req.params.id1].links[req.params.id2].links.length, res, next);
});

app.post('/:id1/:id2', function(req, res, next) { 
    verifyData(jsonDB.job[req.params.id1].links[req.params.id2], res, next); 
});

app.post('/:id1/:id2/:id3', function(req, res, next) { 
    verifyData(jsonDB.job[req.params.id1].links[req.params.id2].links[req.params.id3], res, next); 
});
  
app.post('/*', function(req, res, next) {
    res.status (404).json ({ status: 404, message: "הדף לא קיים"});
})  

module.exports = app;

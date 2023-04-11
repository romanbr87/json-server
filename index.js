const path = require('path');
var logger = require('morgan');
//const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config();
//const routes = require('./server/routers/routes.js');
const nocache = require("nocache");
const fs = require('fs');
const {app, server} = require ("./server");
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
  
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false }));
app.use(cors({ origin: "*", credentials: true, optionSuccessStatus:200 }));
//app.use(expressSession);
app.use(nocache());
app.use(logger('dev'));
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
/*app.get('/', function(req, res, next) {
    res.json ({ status: 40412, message: "HELLO"})
})*/

app.get('/*', function(req, res, next) {
    res.json ({ status: 404, message: "הדף לא קיים"})
})

app.use(function(req, res, next) { 
    console.log (req.body);
    if (req.method == 'POST' && req.body.key !== 'romanbr87') res.status(404).json (null)
    
    else next();
});

app.post('/', function(req, res, next) { 
    res.json(jsonDB.job); 
});

app.post('/:id', function(req, res, next) { 
    res.json(jsonDB.job[req.params.id]); 
});

app.post('/:id1/:id2', function(req, res, next) { 
    res.json(jsonDB.job[req.params.id1].links[req.params.id2]); 
});

app.post('/:id1/:id2/:id3', function(req, res, next) { 
    res.json(jsonDB.job[req.params.id1].links[req.params.id2].links[req.params.id3]); 
});
  
app.post('/*', function(req, res, next) {
    res.status (404).json ({ status: 404, message: "הדף לא קיים"});
})  

module.exports = app;

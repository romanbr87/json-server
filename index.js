const path = require('path');
var logger = require('morgan');
const cookieParser = require('cookie-parser');
const express = require('express');
//const register = require('@react-ssr/express/register');
const cors = require('cors')
const bodyParser = require('body-parser');
//const ReactDOMServer = require('react-dom/server');
require('dotenv').config();
//const routes = require('./server/routers/routes.js');
const nocache = require("nocache");
const fs = require('fs');
const {app, server} = require ("./server");

let rawdata = fs.readFileSync('db.json');
let db = JSON.parse(rawdata, null, 2);

/*app.use(function(req, res, next) { 
    if (req.method == 'GET') console.log ('ff')
    next();
});*/
  
app.get('/favicon.ico', function(req, res, next) { 
  //res.sendStatus(204); 
  next();
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
app.get('/', function(req, res, next) { 
    res.json(db); 
});

app.get('/:id', function(req, res, next) { 
    res.json(db.job[req.params.id]); 
});

app.get('/:id1/:id2', function(req, res, next) { 
    res.json(db.job[req.params.id1].links[req.params.id2]); 
});

app.get('/:id1/:id2/:id3', function(req, res, next) { 
    res.json(db.job[req.params.id1].links[req.params.id2].links[req.params.id3]); 
});

module.exports = app;

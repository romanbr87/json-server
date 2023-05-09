import cors from 'cors';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import morgan from 'morgan';
import express, { NextFunction, Request, Response } from 'express';
import nocache from 'nocache';

import router from './routes/routes';
import { app, server } from "./server"

const options: cors.CorsOptions = {
    allowedHeaders: [
      'Content-Type',
    ],
    credentials: true,
    methods: 'GET,PUT,POST,DELETE',
    origin: "*",
    preflightContinue: false,
};

/*app.use(function(req: Request, res: Response){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header' , 'authorization');
    next ();
});*/
  
app.use(cors(options));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false }));
app.use(nocache());
app.use(morgan('dev'));

app.use ('/', router);


const http = require('http');
const express = require('express');
const app = express();
var fs = require('fs');
const Joi = require('joi') //For Validation
var helmet = require('helmet') // For Security
var morgan = require('morgan') //For Loging
var path = require('path');
const methodOverride = require('method-override');


const render_Operation=require('./routes/render')
const crud_Operation=require('./routes/crud')


app.use(express.json()) //For json data Transformation
app.use(express.urlencoded({ extended: true }))
app.use(helmet())

//using Boostrap
app.use('/bootstrap' , express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/mdbootstrap' , express.static(__dirname + '/node_modules/mdbootstrap/css'))
app.use("/jquery", express.static(__dirname + "/node_modules/jQuery/dist"));
app.use("/slick-carousel", express.static(__dirname + "/node_modules/slick-carousel/slick"));

app.use(methodOverride('_method'));

app.use('/',render_Operation)
app.use('/blog',crud_Operation)

app.set('/views' + express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/public'));
app.use('/public' , express.static(path.join(__dirname , '/public')));

app.set('view engine', 'ejs');


// Port
const port= process.env.PORT || 3001;
app.listen(port,() =>
    console.log(`Listening on port ${port}`));
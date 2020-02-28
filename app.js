var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var fs = require('fs');
var dt = require('./public/javascripts/myfirstmodule');
var app = express();



// Functions *******************************************************************************************
let handleRequest = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.readFile('./public/pages/test.html', null, function (error, data) {
        if (error) {
            response.writeHead(404);
            response.write('Whoops! File not found!');
        } else {
            //response.write("The date and time are currently: " + dt.myDateTime());
            response.write(data);
            console.log("Home page requested");
        }
        response.end();
    });
};


// Code *************************************************************************************************
app.use(express.static('public'));
//app.use(favicon(path.join('public', 'Images', 'android-icon-36x36.png'))); //TODO
http.createServer(handleRequest).listen(8080);

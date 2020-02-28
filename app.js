var express = require('express');
var path = require('path');
var http = require('http');
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
            console.log(request.url);
        }
        response.end();
    });
};

// Code *************************************************************************************************

//TODO Need to create the server using app
app.use(express.static(__dirname + '/public'));
//app.use(favicon(path.join('public', 'Images', 'android-icon-36x36.png')));
app.use('/static', express.static('public'));
//app.listen(3000);

http.createServer(handleRequest).listen(8080);

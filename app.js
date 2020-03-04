//var mysql = require('mysql'); //TODO not needed - keep for example
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var dt = require('./public/javascripts/myfirstmodule');

// TODO skipped mySQL connection handleRequest

//Express is what we'll use for our web applications, this includes packages useful in web development, such as sessions and handling HTTP requests, to initialize it we can do:
var app = express();

//We now need to let Express know we'll be using some of its packages:
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//app.use(express.static(__dirname + '/public'));
//app.use(favicon(path.join('public', 'Images', 'android-icon-36x36.png')));
app.use('/public', express.static('public'));

//Make sure to change the secret code for the sessions, the sessions package is what we'll use to determine if the user is logged-in, the
//bodyParser package will extract the form data from our login.html file.

//We now need to display our login.html file to the client:
//TODO HOME Page
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/pages' + '/login.html'));
});

//We need to now handle the POST request,
app.post('/auth', function(request, response) {

  var username = request.body.username;
  var password = request.body.password;

  console.log('username:' + username);
  console.log('password:' + password);

  if (username && password) { //// TODO: Better check than this
    request.session.loggedin = true;
		request.session.username = username;
    response.redirect('/home');
    //response.send('Incorrect Username and/or Password!');
    response.end();
  }
  else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

// //TODO HOME Page
app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/public/pages' + '/homePage.html'));
		//response.send('Welcome back, ' + request.session.username + '!' + '\n' + "The date and time are currently: " + dt.myDateTime());
	} else { // User not logged in
		response.redirect('/');
	}
	//response.end();
});

app.get('/newUser', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/pages' + '/signUp.html'));
});

app.post('/storeUser', function(request, response) {
	//Create new user on database
	var username = request.body.username;
	var password = request.body.password;
	var firstName = request.body.firstName;
	var lastName = request.body.lastName;
	var email = request.body.email;

	if (username && password) { //// TODO: Better check than this
		//check and store all these details in mongoDB
	}
	else {
		response.redirect('/newUser');
	}

});

app.listen(8080);

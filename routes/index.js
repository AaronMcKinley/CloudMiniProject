//Notes
//res.render('login', {title: "My First Page"});
//res.render('login');

//TODO dirname goes into routes folder
//res.sendFile(path.join(__dirname + '/index.js'));

//// mongoose.connection.dropDatabase();
//Customer.create({ name: 'C', age: 40, email: 'c@foo.bar' });


// TO save to Database
// var CoursObject = {
//   title: 'Maths',
//   teacher: 'Mary',
//   date: '1/1/2020',
//   content: 'This is the course description',
//   courseID: '1'
// };
//
//  var data = new Course(CoursObject);
//  data.save();

//dt.myDateTime()

// ****************** All just notes above this, dont delete ********************************************************************************************

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var url = require('url');
const { exec } = require("child_process");

var path = require('path');
var publicPages = '/public/pages';
//var dt = require('./public/javascripts/myfirstmodule');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/collegeForums', { useNewUrlParser: true });

// const courseSchema = new mongoose.Schema({
// title: String,
// teacher: String,
// date: String,
// content: String,
// courseID: Number
// });
//
// const Course = mongoose.model('course', courseSchema);

const Course = require('../models/courses');
const Post = require('../models/posts');

// ********************** functions for GET/POST go here ****************************************************************************************************************


router.get('/', function(req, res, next) {

  if (req.session.loggedin) {
    res.redirect('/home');
    res.end();
  } else { // User not logged in
    //TODO no need to render this, just send the file
    res.render('login');
        //res.sendFile(path.join(__dirname + publicPages + '/login.html'));
  }

});

router.post('/auth', function(req, res, next) {
  var myFormObject = {
    username: req.body.username,
    password: req.body.password
  };

  if (myFormObject.username && myFormObject.password) { //// TODO: Better check than this
    req.session.loggedin = true;
		req.session.username = myFormObject.username;
    res.redirect('/home');
    res.end();
  }
  else {
		res.send('Please enter Username and Password!');
		res.end();
	}

});

// HOME Page
router.get('/home', function(req, res, next) {
  if (req.session.loggedin) {
  		res.render('HomePage', {yourName: req.session.username} );
  } else { // User not logged in
  		res.redirect('/');
  		res.end();
  }
});

router.post('/ForumPage', function(req, res, next) {
  var id = req.body.theCourseID;
  console.log(id);

  Post.find( {courseID : id}, function(err, docs) {
    //TODO sort docs, could come in any order
    res.render('Forum', { courseName: id, posts: docs });
  });
});

router.get('/Courses', function(req, res, next) {
  Course.find( function(err, docs) {
    //TODO sort docs, could come in any order
    res.render('Courses', { courses: docs });
  });
});

router.post('/newPost', function(req, res, next) {
  var newReplyObject = {
    author: 'TestAuthor',
    date: 'Today', //TODO get current date and time
    time: 'Today',
    content: req.body.data,
    courseID: 2
  };

   var data = new Post(newReplyObject);
   data.save();

   res.redirect(307, '/ForumPage');
});

router.get('/newUser', function(req, res, next) {
  //res.sendFile(path.join(__dirname + publicPages + '/signUp.html'));
});

router.post('/storeUser', function(req, res, next) {
  //Create new user on database
  var newUser = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  };

  if (newUser.username && newUser.password) { //// TODO: Better check than this
    //check and store all these details in mongoDB
  }
  else {
    res.redirect('/newUser');
  }
});

router.get('/signOut', function(req, res, next) {
  req.session.loggedin = false;
  //TODO dirname goes into routes folder
  //res.sendFile(path.join(__dirname + publicPages + '/login.html'));
  res.render('login', {message: 'You have been successfully logged out'});
});



module.exports = router;

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
var dt = require('../public/javascripts/myfirstmodule');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/collegeForums', { useNewUrlParser: true });

const Course = require('../models/courses');
const Post = require('../models/posts');
const User = require('../models/users');
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

  User.findOne( {username : req.body.username,
              password : req.body.password},
              function(err, docs) {
                if(!docs)
                {
                  res.render('login');
                  return;
                }
                else {
                  req.session.loggedin = true;
              		req.session.username = req.body.username;
                  //req.session.firstname =
                  res.redirect('/home');
                  res.end();
                }

  });

  // Comment this all back in to get access if dataabse isnt working
  // if (req.body.username && req.body.password) { //// TODO: Better check than this
  //   req.session.loggedin = true;
	// 	req.session.username = req.body.username;
  //   //req.session.firstname =
  //   res.redirect('/home');
  //   res.end();
  // }
  // else {
	// 	res.send('Please enter Username and Password!');
	// 	res.end();
	// }

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
    res.render('Forum', { courseID: id, posts: docs });
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
    author: req.session.username,
    date: dt.myDate(), //TODO get current date and time
    time: dt.myTime(),
    content: req.body.data,
    courseID: req.body.theCourseID
  };

   var data = new Post(newReplyObject);
   data.save();

   //Now update the "last updated part in the courses collection
   Course.findOneAndUpdate( {courseID : req.body.theCourseID}, {date: dt.myDateTime() }, function() {
     res.redirect(307, '/ForumPage');
     res.end();
   });

});

router.get('/newUser', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/../' +publicPages + '/signUp.html'));
});

router.post('/storeUser', function(req, res, next) {

  var newUserObject = {
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email
  };

  //TODO doesnt check is the username already exists
   var data = new User(newUserObject);
   data.save();

   req.session.loggedin = true;
   req.session.username = newUserObject.username;
   req.session.firstname = newUserObject.firstname;
   res.redirect('/home');
   res.end();

});
// *****************************************************************************************************************************

router.get('/signOut', function(req, res, next) {
  req.session.loggedin = false;
  req.session.username = "";
  req.session.firstname = "";
  //TODO dirname goes into routes folder
  //res.sendFile(path.join(__dirname + publicPages + '/login.html'));
  res.render('login', {message: 'You have been successfully logged out'});
});



module.exports = router;

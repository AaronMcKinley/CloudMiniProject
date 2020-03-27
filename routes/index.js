//Notes
//res.render('login', {title: "My First Page"});
//res.render('login');

//TODO dirname goes into routes folder
//res.sendFile(path.join(__dirname + '/index.js'));

//// mongoose.connection.dropDatabase();
//Customer.create({ name: 'C', age: 40, email: 'c@foo.bar' });

//  // var item = {
  //   name: 'pa',
  //   aage: '12',
  // };
  //
  // var data = new UserData(item);
  // data.save();


//dt.myDateTime()
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var url = require('url');
const { exec } = require("child_process");

var path = require('path');
var publicPages = '/public/pages';
//var dt = require('./public/javascripts/myfirstmodule');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/forums', { useNewUrlParser: true });
//mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });


// var Schema = mongoose.Schema;
//
// var userDataSchema = new Schema({
//   name: String,
//   age: String,
// }, {collection: 'testGH'});
const courseSchema = new mongoose.Schema({
title: String,
teacher: String,
date: String,
content: String,
courseID: Number
});

// const customerSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   email: String
// });


// var UserData = mongoose.model('testGH', userDataSchema);
  //const Customer = mongoose.model('Customer', customerSchema);
  const Course = mongoose.model('course', courseSchema);

  //TODO make sure to remove this !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  mongoose.connection.dropDatabase();

  var CoursObject = {
    title: 'Maths',
    teacher: 'Mary',
    date: '1/1/2020',
    content: 'This is the course description',
    courseID: '1'
  };

  var CoursObject2 = {
    title: 'English',
    teacher: 'John',
    date: '10/10/2020',
    content: 'second course description',
    courseID: '2'
  };

  var CoursObject3 = {
    title: 'Irish',
    teacher: 'Pat',
    date: '12/12/2020',
    content: 'third course description',
    courseID: '3'
  };

   var data = new Course(CoursObject);
   data.save();

   var data = new Course(CoursObject2);
   data.save();

   var data = new Course(CoursObject3);
   data.save();
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

  var PostObject = {
    author: 'Mike',
    date: '1/1/2020',
    time: '16:50',
    content: 'This the the data in the post',
    postID: '1'
  };

  var PostObject2 = {
    author: 'Tom',
    date: '10/2/2020',
    time: '16:59',
    content: 'This the second data in the post',
    postID: '2'
  };

  //TOdo query database with the id above

  var myPostlist = [PostObject, PostObject2];

  res.render('Forum', { courseName: id, posts: myPostlist });
});

router.get('/Courses', function(req, res, next) {
  Course.find( function(err, docs) {
    //TODO sort docs, could come in any order
    res.render('Courses', { courses: docs });
  });
});

router.get('/newUser', function(req, res, next) {
  //res.sendFile(path.join(__dirname + publicPages + '/signUp.html'));
});

router.post('/storeUser', function(req, res, next) {
  //Create new user on database
  var newUser = {
    username: request.body.username,
    password: request.body.password,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email
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

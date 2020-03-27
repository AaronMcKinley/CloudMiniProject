var mongoose =  require('mongoose');

const courseSchema = new mongoose.Schema({
title: String,
teacher: String,
date: String,
content: String,
courseID: Number
});

module.exports = mongoose.model('course', courseSchema);

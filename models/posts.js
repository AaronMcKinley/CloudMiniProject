var mongoose =  require('mongoose');

const postSchema = new mongoose.Schema({
author: String,
date: String,
time: String,
content: String,
courseID: Number
});

module.exports = mongoose.model('post', postSchema);

const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model( "Post", PostSchema)
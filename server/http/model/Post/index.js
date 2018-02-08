const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validation = require('./validation');

const statuses = [
  'draft',
  'published',
];

const categories = [
  'react',
  'redux',
  'nodejs',
  'webpack',
];

const PostSchema = Schema({
  title: {
    type: String,
    trim: true,
    validate: validation.title,
    required: [true, 'Field is required']
  },
  content: {
    type: String,
    trim: true,
    required: [true, 'Field is required']
  },
  status: {
    type: String,
    trim: true,
    enum: {
      values: statuses,
      message: 'Field {PATH} has an invalid category.'
    },
    required: [true, 'Field is required']
  },
  category: {
    type: String,
    trim: true,
    enum: {
      values: categories,
      message: 'Field {PATH} has an invalid category.'
    },
    required: [true, 'Field is empty'],
  },
}, { timestamps: true });

const Post = mongoose.model('post', PostSchema);

module.exports = Post;


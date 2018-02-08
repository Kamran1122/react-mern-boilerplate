const Post = require('./');
const { createPost } = require('./utils');
const { createChars } = require('../../../validation/utils');
const errorMessage = (err, prop) => err.errors[prop].message;

describe('title', () => {
  it('required', (done) => {
    const newPost = createPost({ title: '' });
    new Post(newPost)
      .save()
      .catch(err => {
        expect(errorMessage(err, 'title')).to.equal('Field is required');
        done();
      });
  });

  it('minLength', (done) => {
    const newPost = createPost({ title: 's' });
    new Post(newPost)
      .save()
      .catch(err => {
        expect(errorMessage(err, 'title')).to.equal('Field must have more than 4 characters.');
        done();
      });
  });

  it('maxLength', (done) => {
    const post = createPost({ title: createChars(41), });
    new Post(post)
      .save()
      .catch(err => {
        expect(errorMessage(err, 'title')).to.equal('Field must have less than 40 characters.');
        done();
      });
  });
});

describe('content', () => {
  it('required', (done) => {
    const newPost = createPost({ content: '' });
    new Post(newPost)
      .save()
      .catch(err => {
        expect(errorMessage(err, 'content')).to.equal('Field is required');
        done();
      });
  });
});

describe('status', () => {
  it('enum', (done) => {
    const newPost = createPost({ status: 'invalid enum' });
    new Post(newPost)
      .save()
      .catch(err => {
        expect(errorMessage(err, 'status')).to.equal('Field status has an invalid category.');
        done();
      });
  });
});

describe('category', () => {
  it('enum', (done) => {
    const newPost = createPost({ category: 'invalid enum' });
    new Post(newPost)
      .save()
      .catch(err => {
        expect(errorMessage(err, 'category')).to.equal('Field category has an invalid category.');
        done();
      });
  });
});


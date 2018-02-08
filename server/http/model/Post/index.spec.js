const Post = require('.');
const { createPost } = require('./utils');

describe('Post Model', () => {
  it('Create a post', done => {
    const postTitle = 'post-title';
    const newPost = createPost({ title: postTitle });

    new Post(newPost)
      .save()
      .then(({ title}) => {
        expect(title).to.equal(postTitle);
        done();
      })
      .catch(err => {
        done()
      })
  });
});

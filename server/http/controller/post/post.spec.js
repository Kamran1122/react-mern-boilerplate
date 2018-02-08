const request = require('supertest');
const Post = require('../../model/Post');
const app = require('../../../app');
const { createPost } = require('../../model/Post/utils');

describe('UsersController', () => {
  describe('GET /api/index', () => {
    it('should fetch all posts', (done) => {
      const newPost = createPost();

      new Post(newPost)
        .save()
        .then(res => {
          request(app)
            .get('/api/posts')
            .send()
            .end((err, res) => {
              expect(res.body.length).to.equal(1);
              done();
            });
        })
    });
  });

  describe('POST /api/posts', () => {
    it('should create a new post', done => {
      const newPost = createPost({ title: 'read my blog' });

      request(app)
        .post('/api/posts')
        .send(newPost)
        .end((err, res) => {
          expect(res.body.title).to.equal(newPost.title);
          done();
        });
    });
  });

  describe('PUT /api/posts/:id', () => {
    it('should update a post', done => {
      const newPost = createPost({ title: 'redux is cool' });

      new Post(newPost)
        .save()
        .then(post => {
          const { _id } = post;
          const url = `/api/posts/${_id}`;
          request(app)
            .put(url)
            .send({ title: 'redux is awesome!' })
            .end((err, res) => {
              const updatedPost = res.body;
              expect(updatedPost.title).to.equal('redux is awesome!');
              done();
            });
        })
    });
  });

  describe('DELETE /api/remove/:id', () => {
    it('should update a post', done => {
      const newPost = createPost();
      new Post(newPost)
        .save()
        .then(post => {
          request(app)
            .delete(`/api/posts/${post._id}`)
            .send()
            .end((err, res) => {
              expect(res.body).to.deep.equal({ success: true });
              Post
                .find({})
                .then(posts => {
                  expect(posts.length).to.equal(0);
                  done();
                });
            })
        })
    });
  });
});

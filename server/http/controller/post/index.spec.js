const request = require('supertest');
const Post = require('../../model/Post');
const User = require('../../model/User');
const app = require('../../../app');
const { createPost } = require('../../model/Post/utils');
const { createUser, userWithToken } = require('../../model/User/utils');

describe('UsersController', () => {
  describe('GET /api/index', () => {
    it('should fetch all posts', (done) => {
      const newPost = createPost();

      new Post(newPost)
        .save()
        .then(() => {
          request(app)
            .get('/api/posts')
            .send()
            .end((err, res) => {
              expect(res.body.length).to.equal(1);
              done();
            });
        })
    });

    it('should fetch 1 postById', (done) => {
      const newPost = createPost();

      new Post(newPost)
        .save()
        .then(({ _id }) => {
          request(app)
            .get(`/api/posts?id=${_id}`)
            .send()
            .end((err, res) => {
              expect(res.body._id).to.equal(_id.toString());
              done();
            });
        })
    });
  });

  describe('POST /api/posts', () => {
    it('should create a new post and have the user save it.', done => {
      const newPost = createPost({ title: 'read my blog' });
      const user = new User(createUser());

      new User(user)
        .save()
        .then(newUser => {
          const { token } = userWithToken(newUser._id, newUser.toObject());
          request(app)
            .post('/api/posts')
            .set('Authorization', token)
            .send(newPost)
            .end((err, res) => {
              expect(res.body.title).to.equal(newPost.title);
              done();
            });
        })
        .catch(err => {
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

  // TODO: [] Only deletion of users own posts
  // TODO: [] I can' figure out how to make this query
  describe('DELETE /api/remove/:id', () => {
    it('should delete a post', done => {
      const newPost = createPost({ title: 'read my blog' });
      const user = new User(createUser());

      new User(user)
        .save()
        .then(newUser => {
          const { token } = userWithToken(newUser._id, newUser.toObject());
          request(app)
            .post('/api/posts')
            .set('Authorization', token)
            .send(newPost)
            .end((err, res) => {
              const { _id: postId } = res.body;
              request(app)
                .delete(`/api/posts/${postId}`)
                .set('Authorization', token)
                .send(newPost)
                .end((err, res) => {
                  User
                    .findById(newUser._id)
                    .then(({ posts }) => {
                      expect(posts.length).to.equal(0);
                      Post
                        .find({})
                        .then((posts) => {
                          expect(posts.length).to.equal(0);
                          done();
                        })
                    })
                });
            });
        })
    });
  });
});

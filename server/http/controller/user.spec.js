const request = require('supertest');
const app = require('../../app');
const { createUser, decodeToken } = require('../model/User/utils');

describe('test', () => {
  it('should POST to /api/register', done => {
    const user = createUser();
    request(app)
      .post('/api/register')
      .send(user)
      .end((err, res) => {
        const { username, password, token } = res.body;
        expect(username).to.equal(user.username);
        // we don't send the hashed password back
        expect(password).to.equal(undefined);
        expect(token).to.exist;
        done();
      });
  });

  it('should POST to /api/login and receive a valid token', done => {
    const user = createUser();
    const { email, password } = createUser();
    // register the user
    request(app)
      .post('/api/register')
      .send(user)
      .end((err, res) => {
        // local login the user
        request(app)
          .post('/api/login')
          .send({ email, password })
          .end((err, res) => {
            const { _id, token } = res.body;
            const decodedToken = decodeToken(token);
            expect(decodedToken.id).to.equal(_id);
            done();
          });
      });
  });
});
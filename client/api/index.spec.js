import { register } from '.';

describe('test', () => {
  xit('test register API call', done => {
    register({ email: 'websdeveloperpr@gmail.com', password: '123qweQWE' })
      .then(res => {
        console.log('body');
        done();
      })

      .catch(err => {
        console.log('error');
        done();
      });
  });
});
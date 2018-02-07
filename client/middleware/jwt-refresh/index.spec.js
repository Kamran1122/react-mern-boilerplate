import { getSessionTimeLeftInMs } from './';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = '123';
describe('tokenTimeLeft', () => {
  it('should return  object with expired property se to true.', done => {
    const token = jwt.sign({ sub: 1 }, JWT_SECRET_KEY, { expiresIn: '1s' });

    setTimeout(() => {
      const { expired } = getSessionTimeLeftInMs(token);
      expect(expired).toEqual(true);
      done();
    }, 2000);
  });

  it('should return  object with expired property se to false.', done => {
    const token = jwt.sign({ sub: 1 }, JWT_SECRET_KEY, { expiresIn: '3s' });
    setTimeout(() => {
      const { expired } = getSessionTimeLeftInMs(token);
      expect(expired).toEqual(false);
      done();
    }, 2000);
  });
});

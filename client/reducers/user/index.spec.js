import expect from 'expect';
import reducer, {
  types,
  actions,
  selectors,
  initialState,
} from './';

describe('initialState', () => {
  it('should have the correct initial state', () => {
    expect(initialState).toEqual({
      _id: '',
      createdAt: '',
      updatedAt: '',
      city: '',
      state: '',
      email: '',
      phone: '',
      country: '',
      zipCode: '',
      birthday: '',
      lastName: '',
      username: '',
      firstName: '',
    });
  });
});

describe('selectors', () => {
  it('should return the correct state', () => {
    const state = {
      user: initialState
    };
    expect(selectors.user(state)).toEqual(initialState);
  });
});

describe('actions', () => {
  it('should return the correct payload', () => {
    const payload = {
      email: 'webdeveloperpr@gmail.com',
      password: '123qweasd',
    };
    const result = actions.userLogin(payload);
    expect(result).toEqual({
      type: types.USER_LOGIN,
      payload
    })
  });
});

describe('reducer', () => {
  it('should return the correct state when no action matches', () => {
    const state = reducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  it('should return the correct state and not include the password', () => {
    const payload = {
      email: 'webdeveloperpr@gmail.com',
      password: '123qweasd',
    };
    const state = reducer(initialState, actions.userLogin(payload));
    expect(state).toEqual(
      {
        _id: '',
        birthday: '',
        updatedAt: '',
        createdAt: '',
        city: '',
        country: '',
        email: 'webdeveloperpr@gmail.com',
        firstName: '',
        lastName: '',
        phone: '',
        state: '',
        username: '',
        zipCode: ''
      }
    );
  });
});


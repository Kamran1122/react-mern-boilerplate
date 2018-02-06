const types = {
  AUTH_USER: 'AUTH_USER',
  UNAUTH_USER: 'UNAUTH_USER',
};

const actions = {
  authUser: () => ({ type: types.AUTH_USER, payload: true }),
  unauthUser: () => ({ type: types.UNAUTH_USER, payload: false }),
};

const selectors = {
  auth: state => state.auth,
};

const initialState = {
  authenticated: false,
};

const reducer = (state = initialState, { type }) => {
  switch (type) {

    case types.AUTH_USER: {
      return { ...state, ...{ authenticated: true } };
    }

    case types.UNAUTH_USER: {
      return { ...state, ...{ authenticated: false } };
    }

    default: {
      return state;
    }
  }
};

export {
  types,
  actions,
  selectors,
  initialState,
};

export default reducer;

const types = {
  SET_REFERRER: 'SET_REFERRER'
};

const actions = {
  setReferrer: payload => {
    const referrer = ['/login', '/logout'].every(x => x !== payload)
      ? payload
      : '/';

    return { type: types.SET_REFERRER, payload: referrer }
  },
};

const selectors = {
  location: state => state.location,
};

const initialState = {
  referrer: '',
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case types.SET_REFERRER: {
      return { ...state, referrer: payload };
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

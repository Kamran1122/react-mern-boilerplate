import * as R from 'ramda';

const types = {
  USER_LOGIN: 'USER_LOGIN'
};

const actions = {
  userLogin: payload => ({ type: types.USER_LOGIN, payload }),
};

const selectors = {
  user: state => state.user,
};

const initialState = {
  _id: '',
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
  createdAt: '',
  updatedAt: '',
};

const mergeMatchingProps = (state, payload) => {
  const keys = R.keys(state);
  const matchingPayloadProps = R.pick(keys, payload);
  return R.mergeDeepLeft(matchingPayloadProps, state);
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case types.USER_LOGIN: {
      return mergeMatchingProps(state, payload);
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

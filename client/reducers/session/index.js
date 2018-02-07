import jwt from 'jsonwebtoken';
import ms from 'ms';

const createInitialState = props => ({
  life: 0,
  duration: 0,
  expired: true,
  ...props,
});

const types = {
  SET_SESSION: 'SET_SESSION',
};

const actions = {
  setSession: payload => ({ type: types.SET_SESSION, payload }),
};

const selectors = {
  session: state => state.session,
};

const initialState = createInitialState();

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case types.SET_SESSION: {
      return payload;
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
  createInitialState,
};

/**
 * @param token
 * @returns {{life: number, expired: boolean, duration: number}}
 */
const getSessionTimeLeftInMs = token => {
  const { iat, exp } = jwt.decode(token);
  const duration = (exp - iat);
  const currentTimeInS = Math.floor(Date.now() / 1000);
  const sessionTimeInS = currentTimeInS - iat;
  const life = (duration - sessionTimeInS) * 1000;
  const expired = life <= 0;

  return {
    life, // ms
    expired, //
    duration: duration * 1000, // ms
  }
};

const scanToken = (dispatch, milli) => {
  setInterval(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const { life, expired, duration } = getSessionTimeLeftInMs(token);
      dispatch(actions.setSession({ life: ms(life), expired, duration: ms(duration) }));
    }
  }, milli);
};

export {
  scanToken,
  getSessionTimeLeftInMs,
}

export default reducer;

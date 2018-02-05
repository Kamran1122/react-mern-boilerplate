const types = {
  ADD_COUNT: 'ADD_COUNT'
};

const actions = {
  addCount: payload => ({ type: types.ADD_COUNT, payload }),
};

const selectors = {
  count: state => state.count,
};

const initialState = {
  count: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case types.DEFAULT: {
      state.count++;
      return state;
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
};

export default reducer;

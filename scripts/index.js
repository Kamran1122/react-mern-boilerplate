const types = {
  ADD_COUNT: 'ADD_COUNT'
};

const actions = {
  addCount: () => ({ type: types.ADD_COUNT, payload: 1 }),
};

const selectors = {
  count: state => state.count,
};

const initialState = {
  count: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case types.ADD_COUNT: {
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
  initialState,
};

export default reducer;

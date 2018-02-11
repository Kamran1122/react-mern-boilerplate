const createInitialState = props => ({
  posts: [],
  category: 'js',
  ...props,
});

const types = {
  CHANGE_CATEGORY: 'CHANGE_CATEGORY',
  RESET_BLOG: 'RESET_BLOG',
};

const actions = {
  changeCategory: payload => ({ type: types.CHANGE_CATEGORY, payload }),
  reset: () => ({ type: types.RESET_BLOG, payload: createInitialState() }),
};

const selectors = {
  blog: state => state.blog,
};

const initialState = createInitialState();

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case types.CHANGE_CATEGORY: {
      const newState = { ...state };
      newState.category = payload;

      return newState;
    }

    case types.RESET_BLOG: {
      return createInitialState();
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

export default reducer;

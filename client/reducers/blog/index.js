import { getPosts, removePost } from '../../api';

const createInitialState = props => ({
  posts: [],
  category: 'js',
  ...props,
});

const types = {
  CHANGE_CATEGORY: 'CHANGE_CATEGORY',
  RESET_BLOG: 'RESET_BLOG',
  FETCH_POSTS: 'FETCH_POSTS',
  SAVE_POSTS: 'SAVE_POSTS',
};

// TODO: [] Test thunks
const thunks = {
  fetchPosts: payload => dispatch => {
    return getPosts(payload)
      .then(({ data }) => dispatch(actions.savePosts(data)))
      .catch(err => console.log(err));
  },
  removePost: payload => (dispatch, getState) => {
    return removePost(payload)
      .then(() => {
        const category = getState().blog.category;
        return dispatch(thunks.fetchPosts({ category }));
      })
      .catch(err => console.log(err));
  },
};

const actions = {
  changeCategory: payload => ({ type: types.CHANGE_CATEGORY, payload }),
  reset: () => ({ type: types.RESET_BLOG, payload: createInitialState() }),
  savePosts: payload => ({ type: types.SAVE_POSTS, payload }),
  ...thunks
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

    case types.SAVE_POSTS: {
      return { ...state, ...{ posts: payload } };
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

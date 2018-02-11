import expect from 'expect';
import reducer, {
  types,
  actions,
  selectors,
  createInitialState,
} from './';

describe('selectors', () => {
  it('should return the correct state', () => {
    const state = {
      blog: createInitialState(),
    };
    expect(selectors.blog(state)).toEqual(createInitialState());
  });
});

describe('actions', () => {
  it('changeCategory()', () => {
    const payload = 'redux';
    const result = actions.changeCategory(payload);
    expect(result).toEqual({
      type: types.CHANGE_CATEGORY,
      payload
    })
  });

  it('reset()', () => {
    const result = actions.reset();
    expect(result).toEqual({
      type: types.RESET_BLOG,
      payload: createInitialState(),
    })
  });
});

describe('reducer', () => {
  it('should return the correct state when no action matches', () => {
    const initialState = createInitialState();
    const state = reducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  it('should reset the blog', () => {
    const state = reducer(createInitialState(), actions.changeCategory('react'));
    expect(state).toEqual(createInitialState({ category: 'react' }));
  });

  it('should reset the user back to it\'s initial state', () => {
    const state = reducer(createInitialState({ name: 'Luis' }), actions.reset());
    expect(state).toEqual(createInitialState());
  });
});

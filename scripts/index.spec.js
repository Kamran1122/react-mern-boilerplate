import expect from 'expect';
import reducer, {
  types,
  actions,
  selectors,
  initialState,
} from './';

describe('initialState', () => {
  it('should have the correct initial state', () => {
    expect(initialState).toEqual({ count: 0 });
  });
});

describe('selectors', () => {
  it('should return the correct state', () => {
    expect(selectors.count({ count: 0 })).toBe(0);
  });
});

describe('actions', () => {
  it('should return the correct payload', () => {
    const result = actions.addCount();
    expect(result).toEqual({
      type: types.ADD_COUNT,
      payload: 1
    })
  });
});

describe('reducer', () => {
  it('should return the correct state when no action matches', () => {
    const state = reducer(initialState, {});
    expect(state).toEqual({ count: 0 });
  });

  it('should return the correct state', () => {
    const state = reducer(initialState, actions.addCount());
    expect(state).toEqual({ count: 1 });
  });
});


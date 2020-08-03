import {reducer, ActionCreator, ActionType, initialState} from "./error.js";

describe(`Action creators`, () => {
  describe(`action setError`, () => {
    it(`returns correct type and payload`, () => {
      const err = `New error`;

      expect(ActionCreator.setError(err)).toEqual({
        type: ActionType.SET_ERROR,
        payload: err,
      });
    });
  });
});

describe(`Reducer`, () => {
  it(`without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe(`action setError`, () => {
    it(`sets new error`, () => {
      const originalState = Object.assign({}, initialState, {errorMessage: `bla bla`});
      const newError = `New error message`;
      const expectedState = Object.assign({}, originalState, {errorMessage: newError});

      expect(
          reducer(originalState, ActionCreator.setError(newError))
      ).toEqual(expectedState);
    });
  });
});

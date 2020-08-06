import {extend} from "../../utils.js";

const initialState = {
  errorMessage: ``,
};

const ActionType = {
  SET_ERROR: `SET_ERROR`,
};

const ActionCreator = {
  setError: (err) => ({
    type: ActionType.SET_ERROR,
    payload: err,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ERROR:
      return extend(state, {
        errorMessage: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, initialState};

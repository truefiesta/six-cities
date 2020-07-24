import {extend} from "../../utils.js";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

const ActionType = {
  CHANGE_AUTH_STATUS: `CHANGE_AUTH_STATUS`,
};

const ActionCreator = {
  changeAuthStatus: (status) => {
    return {
      type: ActionType.CHANGE_AUTH_STATUS,
      payload: status,
    };
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.changeAuthStatus(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setEmail(response.data.email));
      });
    // .catch((err) => {
    //   throw err;
    // });
  },
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_AUTH_STATUS:
      return extend(state, {
        authorizationStatus: action.payload,
      });
  }

  return state;
};

export {AuthorizationStatus, ActionType, ActionCreator, Operation, reducer};

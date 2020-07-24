import {extend} from "../../utils.js";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  email: null,
};

const ActionType = {
  CHANGE_AUTH_STATUS: `CHANGE_AUTH_STATUS`,
  SET_EMAIL: `SET_EMAIL`,
};

const ActionCreator = {
  changeAuthStatus: (status) => {
    return {
      type: ActionType.CHANGE_AUTH_STATUS,
      payload: status,
    };
  },
  setEmail: (email) => {
    return {
      type: ActionType.SET_EMAIL,
      payload: email,
    };
  },
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

  logIn: (userCredentials) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: userCredentials.login,
      password: userCredentials.password,
    })
      .then((response) => {
        dispatch(ActionCreator.changeAuthStatus(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setEmail(response.data.email));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_AUTH_STATUS:
      return extend(state, {
        authorizationStatus: action.payload,
      });
    case ActionType.SET_EMAIL:
      return extend(state, {
        email: action.payload,
      });
  }

  return state;
};

export {AuthorizationStatus, ActionType, ActionCreator, Operation, reducer};

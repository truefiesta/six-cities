import MockAdapter from "axios-mock-adapter";
import {createApi} from "../../api.js";
import {reducer, ActionType, ActionCreator, Operation, AuthorizationStatus} from "./user.js";

const api = createApi(() => {});

describe(`Action creators work correctly`, () => {
  describe(`Action creator for changing Auth status`, () => {
    it(`returns payload: AUTH`, () => {
      expect(ActionCreator.changeAuthStatus(AuthorizationStatus.AUTH)).toEqual({
        type: ActionType.CHANGE_AUTH_STATUS,
        payload: AuthorizationStatus.AUTH,
      });
    });

    it(`returns payload: NO_AUTH, when Auth status changes to NO_AUTH`, () => {
      expect(ActionCreator.changeAuthStatus(AuthorizationStatus.NO_AUTH)).toEqual({
        type: ActionType.CHANGE_AUTH_STATUS,
        payload: AuthorizationStatus.NO_AUTH,
      });
    });
  });

  describe(`Action creator for setting email`, () => {
    it(`returns payload: abc@gmail.com`, () => {
      const email = `abc@gmail.com`;
      expect(ActionCreator.setEmail(email)).toEqual({
        type: ActionType.SET_EMAIL,
        payload: `abc@gmail.com`,
      });
    });

    it(`returns payload: blabla@gmail.com`, () => {
      const email = `blabla@gmail.com`;
      expect(ActionCreator.setEmail(email)).toEqual({
        type: ActionType.SET_EMAIL,
        payload: `blabla@gmail.com`,
      });
    });
  });
});


describe(`Reducer`, () => {
  describe(`works correctly`, () => {
    it(`without additional parameters should return initial state`, () => {
      expect(reducer(undefined, {})).toEqual({
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        email: ``,
      });
    });

    it(`should set email when action SET_EMAIL`, () => {
      const email = `abc@gmail.com`;
      expect(reducer(undefined, ActionCreator.setEmail(email))).toEqual({
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        email: `abc@gmail.com`,
      });
    });

    it(`should set email when action SET_EMAIL`, () => {
      const email = `blabla@gmail.com`;
      expect(reducer({
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        email: ``,
      }, ActionCreator.setEmail(email))).toEqual({
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        email: `blabla@gmail.com`,
      });
    });

    it(`should set NO_AUTH when action CHANGE_AUTH_STATUS to NO_AUTH`, () => {
      expect(reducer({
        authorizationStatus: AuthorizationStatus.AUTH,
        email: `blabla@gmail.com`,
      }, ActionCreator.changeAuthStatus(AuthorizationStatus.NO_AUTH))).toEqual({
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        email: `blabla@gmail.com`,
      });
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuth = Operation.checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200, {
        email: `abd@gmail.com`,
      });

    return checkAuth(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1,
            {
              type: ActionType.CHANGE_AUTH_STATUS,
              payload: AuthorizationStatus.AUTH,
            }
        );
        expect(dispatch).toHaveBeenNthCalledWith(2,
            {
              type: ActionType.SET_EMAIL,
              payload: `abd@gmail.com`,
            }
        );
      });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const userCredentials = {
      login: `abd@gmail.com`,
      password: `1111`,
    };
    const logIn = Operation.logIn(userCredentials);

    apiMock
      .onPost(`/login`, {
        email: userCredentials.login,
        password: userCredentials.password,
      })
      .reply(200, {
        email: `abd@gmail.com`,
      });

    return logIn(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1,
            {
              type: ActionType.CHANGE_AUTH_STATUS,
              payload: AuthorizationStatus.AUTH,
            }
        );
        expect(dispatch).toHaveBeenNthCalledWith(2,
            {
              type: ActionType.SET_EMAIL,
              payload: `abd@gmail.com`,
            }
        );
      });
  });
});

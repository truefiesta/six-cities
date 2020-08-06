import MockAdapter from "axios-mock-adapter";
import {createApi} from "../../api.js";
import {reducer, ActionType, ActionCreator, Operation, AuthorizationStatus, initialState} from "./user.js";

const api = createApi(() => {});

describe(`Action creators`, () => {
  describe(`Action changeAuthStatus`, () => {
    it(`returns correct type and payload`, () => {
      expect(ActionCreator.changeAuthStatus(AuthorizationStatus.AUTH)).toEqual({
        type: ActionType.CHANGE_AUTH_STATUS,
        payload: AuthorizationStatus.AUTH,
      });
    });
  });

  describe(`Action setEmail`, () => {
    it(`returns correct type and payload`, () => {
      const email = `abc@gmail.com`;

      expect(ActionCreator.setEmail(email)).toEqual({
        type: ActionType.SET_EMAIL,
        payload: email,
      });
    });
  });
});


describe(`Reducer`, () => {
  it(`without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe(`action changeAuthStatus`, () => {
    it(`sets new authorization status`, () => {
      const originalState = Object.assign({}, initialState, {authorizationStatus: AuthorizationStatus.AUTH});
      const newAuthStatus = AuthorizationStatus.NO_AUTH;
      const expectedState = Object.assign({}, originalState, {authorizationStatus: newAuthStatus});

      expect(
          reducer(originalState, ActionCreator.changeAuthStatus(newAuthStatus))
      ).toEqual(expectedState);
    });
  });

  describe(`action setEmail`, () => {
    it(`sets new email`, () => {
      const email = `abc@gmail.com`;
      const originalState = Object.assign({}, initialState, {email});

      const newEmail = `bla@gmail.com`;
      const expectedState = Object.assign({}, originalState, {email: newEmail});

      expect(
          reducer(originalState, ActionCreator.setEmail(newEmail))
      ).toEqual(expectedState);
    });
  });
});

describe(`Operation checkAuth`, () => {
  it(`makes a correct API call to /login and dispatches correct actions`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuth = Operation.checkAuth();
    const newEmail = `abd@gmail.com`;

    apiMock
      .onGet(`/login`)
      .reply(200, {
        email: newEmail,
      });

    return checkAuth(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1,
            ActionCreator.changeAuthStatus(AuthorizationStatus.AUTH)
        );
        expect(dispatch).toHaveBeenNthCalledWith(2,
            ActionCreator.setEmail(newEmail)
        );
      });
  });
});

describe(`Operation logIn`, () => {
  it(`makes a correct API call to /login and dispatches correct actions`, function () {
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
        email: userCredentials.login,
      });

    return logIn(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1,
            ActionCreator.changeAuthStatus(AuthorizationStatus.AUTH)
        );
        expect(dispatch).toHaveBeenNthCalledWith(2,
            ActionCreator.setEmail(userCredentials.login)
        );
      });
  });
});

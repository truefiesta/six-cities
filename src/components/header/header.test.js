import React from "react";
import renderer from "react-test-renderer";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Header} from "./header.jsx";

const mockStore = configureStore([]);

const store = mockStore({});

describe(`Header`, () => {
  describe(`when the user is not authorized`, () => {
    it(`should render with Sign in`, () => {
      const tree = renderer.create(
          <Provider store={store}>
            <Header
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              email={``}
            />
          </Provider>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`when the user is authorized`, () => {
    it(`should render with email`, () => {
      const tree = renderer.create(
          <Provider store={store}>
            <Header
              authorizationStatus={AuthorizationStatus.AUTH}
              email={`abs@gmail.com`}
            />
          </Provider>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});


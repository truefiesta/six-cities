import * as React from "react";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {BrowserRouter as Router} from "react-router-dom";
import {AuthorizationStatus} from "../../reducer/user/user";
import {Provider} from "react-redux";
import {Header} from "./header";

const mockStore = configureStore([]);

const store = mockStore({});

describe(`Header snapshot`, () => {
  describe(`when the user is not authorized`, () => {
    it(`should render with Sign in`, () => {
      const tree = renderer.create(
          <Provider store={store}>
            <Router>
              <Header
                authorizationStatus={AuthorizationStatus.NO_AUTH}
                email={``}
              />
            </Router>
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
            <Router>
              <Header
                authorizationStatus={AuthorizationStatus.AUTH}
                email={`abs@gmail.com`}
              />
            </Router>
          </Provider>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});


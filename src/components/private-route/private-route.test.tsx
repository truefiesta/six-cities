import renderer from "react-test-renderer";
import React from "react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {MemoryRouter as Router} from "react-router";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {AppRoute} from "../../const.js";
import {NameSpace} from "../../reducer/name-space.js";
import PrivateRoute from "./private-route.jsx";

const MockComponent = () => <div />;
const mockStore = configureStore([]);

describe(`PrivateRoute snapshot`, () => {
  it(`should not render MockComponent`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        email: ``,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <Router initialEntries={[AppRoute.FAVORITE]}>
            <PrivateRoute
              exact
              path={AppRoute.FAVORITE}
              render={() => {
                return <MockComponent/>;
              }}
            />
          </Router>
        </Provider>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render MockComponent`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        email: `abc@gmail.com`,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <Router initialEntries={[AppRoute.FAVORITE]}>
            <PrivateRoute
              exact
              path={AppRoute.FAVORITE}
              render={() => {
                return <MockComponent/>;
              }}
            />
          </Router>
        </Provider>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

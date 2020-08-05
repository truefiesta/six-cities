import * as React from "react";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import {CityName} from "../../const.js";
import {NameSpace} from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import LoginScreen from "./login-screen.jsx";

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.FILTERS]: {
    city: CityName.AMSTERDAM,
  },
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    email: ``,
  }
});

describe(`LoginScreen snapshot`, () => {
  it(`should render correctly`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <LoginScreen
              onUserLogIn={() => null}
            />
          </Router>
        </Provider>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

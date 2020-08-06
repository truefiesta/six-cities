import * as React from "react";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import {CityName} from "../../const";
import {NameSpace} from "../../reducer/name-space";
import {AuthorizationStatus} from "../../reducer/user/user";
import LoginScreen from "./login-screen";

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

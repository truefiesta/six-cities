import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, mount} from "enzyme";
import {MemoryRouter as Router} from "react-router";
import {AppRoute} from "../../const.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {PrivateRoute} from "./private-route.jsx";

configure({
  adapter: new Adapter(),
});

const MockComponent = () => <div className="some-class" />;

describe(`PrivateRoute`, () => {
  it(`renders MockComponent`, () => {
    const privateRoute = mount(
        <Router initialEntries={[AppRoute.FAVORITE]}>
          <PrivateRoute
            exact
            path={AppRoute.FAVORITE}
            authorizationStatus={AuthorizationStatus.AUTH}
            render={() => {
              return <MockComponent/>;
            }}
          />
        </Router>
    );

    expect(privateRoute.exists(`.some-class`)).toEqual(true);
  });

  it(`redirects when user is not authorized`, () => {
    const privateRoute = mount(
        <Router initialEntries={[AppRoute.FAVORITE]}>
          <PrivateRoute
            exact
            path={AppRoute.FAVORITE}
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            render={() => {
              return <MockComponent/>;
            }}
          />
        </Router>
    );

    const history = privateRoute.find(`Router`).prop(`history`);
    expect(history.location.pathname).toBe(AppRoute.LOGIN);
  });
});

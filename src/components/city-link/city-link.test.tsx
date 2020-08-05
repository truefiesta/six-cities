import * as React from "react";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import {CityName} from "../../const";
import CityLink from "./city-link";

const mockStore = configureStore([]);
const store = mockStore({});

describe(`CityLink snapshot`, () => {
  it(`should render`, () => {
    const tree = renderer.create(
        <Router>
          <Provider store={store}>
            <CityLink
              city={CityName.AMSTERDAM}
              isActive={false}
              isTab={false}
              onCityClick={() => null}
            />
          </Provider>
        </Router>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render with tabs class`, () => {
    const tree = renderer.create(
        <Router>
          <Provider store={store}>
            <CityLink
              city={CityName.AMSTERDAM}
              isActive={true}
              isTab={true}
              onCityClick={() => null}
            />
          </Provider>
        </Router>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

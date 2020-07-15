import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import testMocks from "../../test-mocks/test-mocks.js";
import {CityName, SortTypes} from "../../const.js";

const offers = testMocks;

const mockStore = configureStore([]);

jest.mock(`../map/map.jsx`, () => () => {
  return (
    <div id="map"></div>
  );
});

describe(`src/App.jsx`, () => {
  describe(`when the city is chosen and the offers is non-empty array`, () => {
    it(`should render with data`, () => {
      const store = mockStore({
        city: CityName.AMSTERDAM,
        offers,
        sortType: SortTypes.POPULAR,
        activeCard: null,
      });

      const tree = renderer.create(
          <Provider store={store}>
            <App/>
          </Provider>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

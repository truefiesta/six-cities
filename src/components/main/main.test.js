import React from "react";
import renderer from "react-test-renderer";
import {Main} from "./main.jsx";
import testMocks from "../../test-mocks/test-mocks.js";
import {CityName, SortTypes} from "../../const.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const offers = testMocks;

jest.mock(`../map/map.jsx`, () => () => {
  return (
    <div id="map"></div>
  );
});

const cityOffers = offers.slice(0, 4);

const mockStore = configureStore([]);

describe(`src/Main.jsx`, () => {
  describe(`when the city is chosen and offers is non-empty array`, () => {
    it(`should render with data`, () => {
      const store = mockStore({
        city: CityName.AMSTERDAM,
        offers: cityOffers,
        sortType: SortTypes.POPULAR,
        activeCard: null,
      });

      const tree = renderer.create(
          <Provider store={store}>
            <Main
              sortedCityOffers={cityOffers}
              city={CityName.AMSTERDAM}
              onOfferDetailsOpen={() => null}
            />
          </Provider>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`when the offers is an empty array`, () => {
    it(`should render with data`, () => {
      const store = mockStore({
        city: null,
        offers: [],
        sortType: SortTypes.POPULAR,
        activeCard: null,
      });

      const tree = renderer.create(
          <Provider store={store}>
            <Main
              sortedCityOffers={cityOffers}
              city={CityName.AMSTERDAM}
              onOfferDetailsOpen={() => null}
            />
          </Provider>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

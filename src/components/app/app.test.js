import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {CityName, SortTypes} from "../../const.js";
import {offers, reviews, offersNearby} from "../../test-mocks/test-mocks.js";
import {NameSpace} from "../../reducer/name-space.js";

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
        [NameSpace.FILTERS]: {
          city: CityName.AMSTERDAM,
          sortType: SortTypes.POPULAR,
          activeCard: null,
        },
        [NameSpace.OFFERS]: {
          offers,
          currentOfferReviews: reviews,
          currentOffersNearby: offersNearby,
        },
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

  describe(`when the offers is an empty array`, () => {
    it(`should render with no data`, () => {
      const store = mockStore({
        [NameSpace.FILTERS]: {
          city: null,
          sortType: SortTypes.POPULAR,
          activeCard: null,
        },
        [NameSpace.OFFERS]: {
          offers: [],
          currentOfferReviews: [],
          currentOffersNearby: [],
        },
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

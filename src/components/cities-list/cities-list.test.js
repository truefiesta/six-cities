import React from "react";
import renderer from "react-test-renderer";
import {CitiesList} from "./cities-list.jsx";
import {CityName, SortTypes} from "../../const.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {offers, reviews, offersNearby} from "../../test-mocks/test-mocks.js";
import {NameSpace} from "../../reducer/name-space.js";

const mockStore = configureStore([]);
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

const cities = Object.values(CityName);

describe(`src/CitiesList.jsx`, () => {
  describe(`when the city is chosen and offers is non-empty array`, () => {
    it(`should render with data`, () => {
      const tree = renderer.create(
          <Provider store={store}>
            <CitiesList
              city={CityName.AMSTERDAM}
              cities={cities}
              onCityClick={() => null}
            />
          </Provider>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

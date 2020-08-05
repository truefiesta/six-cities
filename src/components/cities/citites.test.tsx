import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {BrowserRouter as Router} from "react-router-dom";
import {CityName, SortType} from "../../const.js";
import {Provider} from "react-redux";
import {offers, reviews, offersNearby} from "../../test-mocks/test-mocks.js";
import {NameSpace} from "../../reducer/name-space.js";
import Cities from "./cities.jsx";

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.FILTERS]: {
    city: CityName.AMSTERDAM,
    sortType: SortType.POPULAR,
    activeCard: null,
  },
  [NameSpace.OFFERS]: {
    offers,
    currentOfferReviews: reviews,
    currentOffersNearby: offersNearby,
  },
});

describe(`Cities`, () => {
  describe(`when the offers is not empty array`, () => {
    it(`should render`, () => {
      const tree = renderer.create(
          <Router>
            <Provider store={store}>
              <Cities/>
            </Provider>
          </Router>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

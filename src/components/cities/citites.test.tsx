import * as React from "react";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {BrowserRouter as Router} from "react-router-dom";
import {CityName, SortType} from "../../const";
import {Provider} from "react-redux";
import {offers, reviews, offersNearby} from "../../test-mocks/test-mocks";
import {NameSpace} from "../../reducer/name-space";
import Cities from "./cities";

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

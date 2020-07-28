import React from "react";
import renderer from "react-test-renderer";
import {Main} from "./main.jsx";
import {CityName, SortTypes} from "../../const.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {offers, reviews, offersNearby} from "../../test-mocks/test-mocks.js";
import {NameSpace} from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {BrowserRouter as Router} from "react-router-dom";

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
        [NameSpace.FILTERS]: {
          city: CityName.AMSTERDAM,
          sortType: SortTypes.POPULAR,
          activeCard: null,
        },
        [NameSpace.OFFERS]: {
          offers: cityOffers,
          currentOfferReviews: reviews,
          currentOffersNearby: offersNearby,
        },
        [NameSpace.USER]: {
          authorizationStatus: AuthorizationStatus.NO_AUTH,
          email: ``,
        }
      });

      const tree = renderer.create(
          <Provider store={store}>
            <Router>
              <Main
                sortedCityOffers={cityOffers}
                onOfferDetailsOpen={() => null}
              />
            </Router>
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
          city: ``,
          sortType: SortTypes.POPULAR,
          activeCard: null,
        },
        [NameSpace.OFFERS]: {
          offers: [],
          currentOfferReviews: [],
          currentOffersNearby: [],
        },
        [NameSpace.USER]: {
          authorizationStatus: AuthorizationStatus.NO_AUTH,
          email: ``,
        }
      });

      const tree = renderer.create(
          <Provider store={store}>
            <Router>
              <Main
                sortedCityOffers={[]}
                onOfferDetailsOpen={() => null}
              />
            </Router>
          </Provider>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

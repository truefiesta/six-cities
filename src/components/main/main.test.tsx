import * as React from "react";
import * as renderer from "react-test-renderer";
import {Main} from "./main";
import {CityName, SortType} from "../../const";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {offers, reviews, offersNearby} from "../../test-mocks/test-mocks";
import {NameSpace} from "../../reducer/name-space";
import {AuthorizationStatus} from "../../reducer/user/user";
import {BrowserRouter as Router} from "react-router-dom";

jest.mock(`../map/map.jsx`, () => () => {
  return (
    <div id="map"></div>
  );
});

const cityOffers = offers.slice(0, 4);

const mockStore = configureStore([]);

describe(`Main snapshot`, () => {
  describe(`when the city is chosen, offers is non-empty array and user is authorized`, () => {
    it(`should render with data`, () => {
      const store = mockStore({
        [NameSpace.FILTERS]: {
          city: CityName.AMSTERDAM,
          sortType: SortType.POPULAR,
          activeCard: null,
        },
        [NameSpace.OFFERS]: {
          offers: cityOffers,
          currentOfferReviews: reviews,
          currentOffersNearby: offersNearby,
        },
        [NameSpace.USER]: {
          authorizationStatus: AuthorizationStatus.AUTH,
          email: `bla@gmail.com`,
        }
      });

      const tree = renderer.create(
          <Provider store={store}>
            <Router>
              <Main
                sortedCityOffers={cityOffers}
              />
            </Router>
          </Provider>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`when there is no data`, () => {
    it(`should render with no data`, () => {
      const store = mockStore({
        [NameSpace.FILTERS]: {
          city: ``,
          sortType: SortType.POPULAR,
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
              />
            </Router>
          </Provider>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

import * as React from "react";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {CityName, SortType} from "../../const";
import {offers, reviews, offersNearby} from "../../test-mocks/test-mocks";
import {NameSpace} from "../../reducer/name-space";
import {AuthorizationStatus} from "../../reducer/user/user";
import App from "./app";

const mockStore = configureStore([]);

jest.mock(`../map/map`);

describe(`App snapshot`, () => {
  describe(`when there is data`, () => {
    it(`should render with data`, () => {
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
        [NameSpace.USER]: {
          authorizationStatus: AuthorizationStatus.NO_AUTH,
          email: ``,
        },
        [NameSpace.ERROR]: {
          errorMessage: ``,
        }
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
        },
        [NameSpace.ERROR]: {
          errorMessage: ``,
        }
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

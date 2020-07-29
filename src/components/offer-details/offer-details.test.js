import React from "react";
import renderer from "react-test-renderer";
import OfferDetails from "./offer-details.jsx";
import {CityName, SortTypes} from "../../const.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {offers, reviews, offersNearby} from "../../test-mocks/test-mocks.js";
import {NameSpace} from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {BrowserRouter as Router} from "react-router-dom";

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.FILTERS]: {
    city: CityName.AMSTERDAM,
    sortType: SortTypes.POPULAR,
    activeCard: null,
  },
  [NameSpace.OFFERS]: {
    reviewError: ``,
    offers,
    currentOfferReviews: reviews,
    currentOffersNearby: offersNearby,
  },
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    email: ``,
  }
});

const offer = offers[0];

jest.mock(`../map/map.jsx`, () => () => {
  return (
    <div id="map"></div>
  );
});

jest.mock(`../reviews-list/reviews-list.jsx`, () => () => {
  return (
    <ul className="reviews__list">
      <li className="reviews__item">
        <div className="reviews__user user">
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img className="reviews__avatar user__avatar" src="/img/avatar-max.jpg" width="54" height="54" alt="Reviews avatar"/>
          </div>
          <span className="reviews__user-name">
            Max
          </span>
        </div>
        <div className="reviews__info">
          <div className="reviews__rating rating">
            <div className="reviews__stars rating__stars">
              <span style={{width: `80%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <p className="reviews__text">
            A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
          </p>
          <time className="reviews__time" dateTime="2019-04-24">April 2019</time>
        </div>
      </li>
    </ul>
  );
});

describe(`src/offers-details.jsx`, () => {
  describe(`when the offers is a non-empty array`, () => {
    it(`should render with data`, () => {
      const tree = renderer.create(
          <Provider store={store}>
            <Router>
              <OfferDetails
                offer={offer}
              />
            </Router>
          </Provider>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

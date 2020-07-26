import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {App} from "./app.jsx";
import {offers, reviews, offersNearby} from "../../test-mocks/test-mocks.js";
import {CityName, SortTypes} from "../../const.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import PropTypes from "prop-types";
import {NameSpace} from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";

Enzyme.configure({
  adapter: new Adapter(),
});

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

const Wrapper = ({children}) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

describe(`App`, () => {
  it(`should update offer in the state when an offer header clicked`, () => {
    const app = mount(
        <App
          onCurrentOfferChange={() => {}}
          offers={offers}
        />,
        {
          wrappingComponent: Wrapper
        }
    );

    const offer = offers[2];
    const card = app.find(`#offer-${offer.id}`);
    const cardHeader = card.find(`h2.place-card__name a`);
    cardHeader.simulate(`click`);

    expect(app.state().clickedOffer).toBe(offer);
  });
});

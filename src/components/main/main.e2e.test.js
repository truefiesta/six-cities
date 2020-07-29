import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Main} from "./main.jsx";
import {CityName, SortTypes} from "../../const.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import PropTypes from "prop-types";
import {offers, reviews, offersNearby} from "../../test-mocks/test-mocks.js";
import {NameSpace} from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {BrowserRouter as Router} from "react-router-dom";

Enzyme.configure({
  adapter: new Adapter(),
});

const cityOffers = offers.slice(0, 4);

const mockStore = configureStore([]);

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

const Wrapper = ({children}) => {
  return (
    <Provider store={store}>
      <Router>
        {children}
      </Router>
    </Provider>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

describe(`Main cards`, () => {
  it(`Card header should be pressed`, () => {

    const main = mount(
        <Main
          sortedCityOffers={cityOffers}
        />,
        {
          wrappingComponent: Wrapper
        }
    );

    const cardsCount = 4;
    const cardHeaders = main.find(`h2.place-card__name a`);
    expect(cardHeaders).toHaveLength(cardsCount);

    cardHeaders.forEach((cardHeader) => {
      cardHeader.simulate(`click`);
    });
  });
});

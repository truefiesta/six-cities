import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {App} from "./app.jsx";
import testMocks from "../../test-mocks/test-mocks.js";
import {CityName, SortTypes} from "../../const.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import PropTypes from "prop-types";

Enzyme.configure({
  adapter: new Adapter(),
});

const offers = testMocks;
const mockStore = configureStore([]);

const store = mockStore({
  city: CityName.AMSTERDAM,
  offers,
  sortType: SortTypes.POPULAR,
  activeCard: null,
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
          onLoad={() => {}}
          offers={offers}
        />,
        {
          wrappingComponent: Wrapper
        }
    );

    const offer = offers[2];
    const card = app.find(`#${offer.id}`);
    const cardHeader = card.find(`h2.place-card__name a`);
    cardHeader.simulate(`click`);

    expect(app.state().clickedOffer).toBe(offer);
  });
});

import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./app.jsx";
import testMocks from "../../test-mocks/test-mocks.js";

Enzyme.configure({
  adapter: new Adapter(),
});

const Settings = {
  OFFERS_COUNT: 312
};

const offers = testMocks;

describe(`App`, () => {
  it(`should update offer in the state when an offer header clicked`, () => {
    const app = mount(
        <App
          offersCount={Settings.OFFERS_COUNT}
          offers={offers}
        />
    );

    const offer = offers[2];
    const card = app.find(`#${offer.id}`);
    const cardHeader = card.find(`h2.place-card__name a`);
    cardHeader.simulate(`click`);

    expect(app.state().clickedOffer).toBe(offer);
  });
});

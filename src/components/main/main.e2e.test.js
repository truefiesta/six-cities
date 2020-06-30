import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";
import testMocks from "../../test-mocks/test-mocks.js";

const Settings = {
  OFFERS_COUNT: 312
};

const offers = testMocks;

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Main cards`, () => {
  it(`Card header should be pressed`, () => {
    const onOfferDetailsOpen = jest.fn();

    const main = mount(
        <Main
          offersCount={Settings.OFFERS_COUNT}
          offers={offers}
          onOfferDetailsOpen={onOfferDetailsOpen}
        />
    );

    const cardsCount = offers.length;
    const cardHeaders = main.find(`h2.place-card__name a`);
    expect(cardHeaders).toHaveLength(cardsCount);

    cardHeaders.forEach((cardHeader) => {
      cardHeader.simulate(`click`);
    });

    expect(onOfferDetailsOpen.mock.calls.length).toBe(cardsCount);
  });
});

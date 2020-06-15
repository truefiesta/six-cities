import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

const Settings = {
  OFFERS_COUNT: 312
};

const offerTitles = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`,
  `Wood and stone place`
];

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Main cards`, () => {
  it(`Card header should be pressed`, () => {
    const onCardHeaderClick = jest.fn();

    const main = shallow(
        <Main
          offersCount={Settings.OFFERS_COUNT}
          offerTitles={offerTitles}
          onCardHeaderClick={onCardHeaderClick}
        />
    );

    const cardHeaders = main.find(`h2.place-card__name a`);

    cardHeaders.forEach((cardHeader) => {
      cardHeader.simulate(`click`);
    });

    const cardsCount = offerTitles.length;

    expect(onCardHeaderClick.mock.calls.length).toBe(cardsCount);
  });
});

import React from "react";
import renderer from "react-test-renderer";
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

describe(`Render Main`, () => {
  it(`with data`, () => {
    const tree = renderer.create(
        <Main
          offersCount={Settings.OFFERS_COUNT}
          offerTitles={offerTitles}
          onCardHeaderClick={() => {}}
        />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`without data`, () => {
    const tree = renderer.create(
        <Main
          offersCount={0}
          offerTitles={[]}
          onCardHeaderClick={() => {}}
        />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

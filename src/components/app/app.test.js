import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

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

describe(`Render App`, () => {
  it(`with data`, () => {
    const tree = renderer.create(
        <App
          offersCount={Settings.OFFERS_COUNT}
          offerTitles={offerTitles}
        />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`without data`, () => {
    const tree = renderer.create(
        <App
          offersCount={0}
          offerTitles={[]}
        />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

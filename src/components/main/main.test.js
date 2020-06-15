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

describe(`src/Main.jsx`, () => {
  describe(`when the offersCount is not zero and the offerTitles is non-empty array`, () => {
    it(`should render with data`, () => {
      const tree = renderer.create(
          <Main
            offersCount={Settings.OFFERS_COUNT}
            offerTitles={offerTitles}
            onOfferDetailsOpen={() => {}}
          />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
  describe(`when the offersCount is zero and the offerTitles empty array`, () => {
    it(`should render without data`, () => {
      const tree = renderer.create(
          <Main
            offersCount={0}
            offerTitles={[]}
            onOfferDetailsOpen={() => {}}
          />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

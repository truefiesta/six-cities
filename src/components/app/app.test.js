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

describe(`src/App.jsx`, () => {
  describe(`when offersCount is not zero and the title is non-empty array`, () => {
    it(`should render with data`, () => {
      const tree = renderer.create(
          <App
            offersCount={Settings.OFFERS_COUNT}
            offerTitles={offerTitles}
          />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
  describe(`when offersCount is zero and the title empty array`, () => {
    it(`should render without data`, () => {
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
});

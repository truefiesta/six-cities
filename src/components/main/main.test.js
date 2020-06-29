import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import testMocks from "../../test-mocks/test-mocks.js";

const Settings = {
  OFFERS_COUNT: 312
};

const offers = testMocks;

jest.mock(`../map/map.jsx`, () => () => {
  return (
    <div id="map"></div>
  );
});

describe(`src/Main.jsx`, () => {
  describe(`when the offersCount is not zero and the offerTitles is non-empty array`, () => {
    it(`should render with data`, () => {
      const tree = renderer.create(
          <Main
            offersCount={Settings.OFFERS_COUNT}
            offers={offers}
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
            offers={[]}
            onOfferDetailsOpen={() => {}}
          />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

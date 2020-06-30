import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
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

describe(`src/App.jsx`, () => {
  describe(`when the offersCount is not zero and the offers is non-empty array`, () => {
    it(`should render with data`, () => {
      const tree = renderer.create(
          <App
            offersCount={Settings.OFFERS_COUNT}
            offers={offers}
          />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
  describe(`when the offersCount is zero and the offerTitles empty array`, () => {
    it(`should render without data`, () => {
      const tree = renderer.create(
          <App
            offersCount={0}
            offers={[]}
          />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

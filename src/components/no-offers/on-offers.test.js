import React from "react";
import renderer from "react-test-renderer";
import NoOffers from "./no-offers.jsx";

describe(`NoOffers snapshot`, () => {
  describe(`when offers is an empty array`, () => {
    it(`should render`, () => {
      const tree = renderer.create(
          <NoOffers/>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

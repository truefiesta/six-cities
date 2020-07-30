import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from "react-router-dom";
import OffersList from "./offers-list.jsx";
import {offers} from "../../test-mocks/test-mocks.js";

const cityOffers = offers.slice(0, 4);

const cardStyle = {
  main: {
    article: `cities__place-card`,
    image: `cities__image-wrapper`,
    list: `cities__places-list tabs__content`,
    info: ``,
  },
};

describe(`src/offers-list.jsx`, () => {
  describe(`when the offers is a non-empty array`, () => {
    it(`should render with data`, () => {
      const tree = renderer.create(
          <Router>
            <OffersList
              offers={cityOffers}
              cardStyle={cardStyle.main}
              onActiveCardChange={() => null}
              onBookmarkStatusChange={() => null}
            />
          </Router>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`when the offers is an empty array`, () => {
    it(`should render with no data`, () => {
      const tree = renderer.create(
          <Router>
            <OffersList
              offers={[]}
              cardStyle={cardStyle.main}
              onActiveCardChange={() => null}
              onBookmarkStatusChange={() => null}
            />
          </Router>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from "react-router-dom";
import OfferCard from "./offer-card.jsx";
import {offers} from "../../test-mocks/test-mocks.js";

const offer = offers[0];

const cardStyle = {
  main: {
    article: `cities__place-card`,
    image: `cities__image-wrapper`,
    list: `cities__places-list tabs__content`,
    info: ``,
  },
};

describe(`src/offer-card.jsx`, () => {
  describe(`when the offer contains data`, () => {
    it(`should render with data`, () => {
      const tree = renderer.create(
          <Router>
            <OfferCard
              offer={offer}
              onMouseOver={() => null}
              onMouseOut={() => null}
              cardStyle={cardStyle.main}
              onBookmarkStatusChange={() => null}
            />
          </Router>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

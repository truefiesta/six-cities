import React from "react";
import renderer from "react-test-renderer";
import OfferCard from "./offer-card.jsx";
import {offers} from "../../test-mocks/test-mocks.js";

const offer = offers[0];

const cardStyle = {
  main: {
    article: `cities__place-card`,
    image: `cities__image-wrapper`,
    list: `cities__places-list tabs__content`,
  },
};

describe(`src/offer-card.jsx`, () => {
  describe(`when the offer contains data`, () => {
    it(`should render with data`, () => {
      const tree = renderer.create(
          <OfferCard
            offer={offer}
            onMouseOver={() => null}
            onMouseOut={() => null}
            onOfferDetailsOpen={() => null}
            cardStyle={cardStyle.main}
          />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

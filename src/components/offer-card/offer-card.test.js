import React from "react";
import renderer from "react-test-renderer";
import OfferCard from "./offer-card.jsx";

const offer = {
  id: `offer-1`,
  image: `http://lorempixel.com/400/200/`,
  price: 120,
  rating: 80,
  name: `Beautiful & luxurious apartment at great location`,
  type: `Apartment`,
  isBookmarked: false,
  isPremium: true,
};

describe(`src/offer-card.jsx`, () => {
  describe(`when the offer contains data`, () => {
    it(`should render with data`, () => {
      const tree = renderer.create(
          <OfferCard
            offer={offer}
            onMouseOver={() => null}
            onOfferDetailsOpen={() => null}
          />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

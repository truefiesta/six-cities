import React from "react";
import renderer from "react-test-renderer";
import OffersList from "./offers-list.jsx";

const offers = [
  {
    id: `offer-1`,
    image: `http://lorempixel.com/400/200/`,
    price: 120,
    rating: 80,
    name: `Beautiful & luxurious apartment at great location`,
    type: `Apartment`,
    isBookmarked: false,
    isPremium: true,
  },
  {
    id: `offer-2`,
    image: `http://lorempixel.com/400/200/`,
    price: 80,
    rating: 80,
    name: `Wood and stone place`,
    type: `Private room`,
    isBookmarked: true,
    isPremium: false,
  },
  {
    id: `offer-3`,
    image: `http://lorempixel.com/400/200/`,
    price: 132,
    rating: 80,
    name: `Canal view Prinsengracht`,
    type: `Apartment`,
    isBookmarked: false,
    isPremium: false,
  },
  {
    id: `offer-4`,
    image: `http://lorempixel.com/400/200/`,
    price: 180,
    rating: 100,
    name: `Nice, cozy, warm big bed apartment`,
    type: `Apartment`,
    isBookmarked: false,
    isPremium: true,
  }
];

describe(`src/offers-list.jsx`, () => {
  describe(`when the offers is a non-empty array`, () => {
    it(`should render with data`, () => {
      const tree = renderer.create(
          <OffersList
            offers={offers}
            onOfferDetailsOpen={() => null}
          />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`when the offers is an empty array`, () => {
    it(`should render with no data`, () => {
      const tree = renderer.create(
          <OffersList
            offers={[]}
            onOfferDetailsOpen={() => null}
          />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

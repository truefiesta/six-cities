import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const Settings = {
  OFFERS_COUNT: 312
};

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

// const offerTitles = [
//   `Beautiful & luxurious apartment at great location`,
//   `Wood and stone place`,
//   `Canal View Prinsengracht`,
//   `Nice, cozy, warm big bed apartment`,
//   `Wood and stone place`
// ];

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

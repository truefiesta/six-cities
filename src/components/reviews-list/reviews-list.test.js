import React from "react";
import renderer from "react-test-renderer";
import ReviewsList from "./reviews-list.jsx";

const reviews = [
  {
    id: 1,
    text: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    rating: 4.1,
    user: {
      id: 1,
      name: `Max`,
      status: true,
      avatar: `img/avatar-max.jpg`,
    },
    date: `2019-04-24`,
  },
  {
    id: 2,
    text: `Very good location ,lovely staff ,clean apartment, great beds.`,
    rating: 4.8,
    user: {
      id: 2,
      name: `Anthony`,
      status: false,
      avatar: `img/avatar-max.jpg`,
    },
    date: `2019-06-25`,
  },
];

describe(`src/reviews-list.jsx`, () => {
  describe(`when the reviews is a non-empty array`, () => {
    it(`should render with data`, () => {
      const tree = renderer.create(
          <ReviewsList
            reviews={reviews}
          />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

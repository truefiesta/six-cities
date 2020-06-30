import React from "react";
import renderer from "react-test-renderer";
import ReviewsList from "./reviews-list.jsx";

const reviews = [
  {
    id: `r000003`,
    text: `Styled to complement the original features in the building, this historic warehouse is centrally located in the cool and vibrant city center.`,
    rating: 4.1,
    user: {
      name: `George`,
    },
    date: `2019-04-24`,
  },
  {
    id: `r000004`,
    text: `Beautiful apartment in a fantastic location. Had a great stay!`,
    rating: 5,
    user: {
      name: `Taylor`,
    },
    date: `2019-03-17`,
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

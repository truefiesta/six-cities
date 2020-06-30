import React from "react";
import renderer from "react-test-renderer";
import Review from "./review.jsx";

const review = {
  id: `r000001`,
  text: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
  rating: 4.1,
  user: {
    name: `Max`,
  },
  date: `2019-04-24`,
};

describe(`src/review.jsx`, () => {
  describe(`when the reviews is a non-empty array`, () => {
    it(`should render with data`, () => {
      const tree = renderer.create(
          <Review
            review={review}
          />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

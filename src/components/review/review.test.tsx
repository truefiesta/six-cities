import * as React from "react";
import * as renderer from "react-test-renderer";
import Review from "./review.jsx";

const review = {
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
};

describe(`Review snapshot`, () => {
  describe(`when there is data`, () => {
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

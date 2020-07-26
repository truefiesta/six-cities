import renderer from "react-test-renderer";
import React from "react";
import Stars from "./stars.jsx";

const RatingStarTitle = {
  ONE_STAR: `terribly`,
  TWO_STARS: `badly`,
  THREE_STARS: `not bad`,
  FOUR_STARS: `good`,
  FIVE_STARS: `perfect`,
};

const ratingOptions = [
  RatingStarTitle.ONE_STAR,
  RatingStarTitle.TWO_STARS,
  RatingStarTitle.THREE_STARS,
  RatingStarTitle.FOUR_STARS,
  RatingStarTitle.FIVE_STARS,
];

describe(`Stars`, () => {
  describe(`when the offers is not empty array`, () => {
    it(`should render with correctly`, () => {
      const tree = renderer.create(
          <Stars
            setName={`Rating`}
            setOptions={ratingOptions}
            selectedOption={1}
            onSelectedOptionChange={() => null}
          />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

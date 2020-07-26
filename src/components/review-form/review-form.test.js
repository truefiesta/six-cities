import React from "react";
import renderer from "react-test-renderer";
import {ReviewForm} from "./review-form.jsx";

describe(`ReviewForm`, () => {
  describe(`when the offers is not empty array`, () => {
    it(`should render with correctly`, () => {
      const tree = renderer.create(
          <ReviewForm
            reviewError={``}
            review={`Nice and cozy apartment near the city center and with a nice view`}
            rating={4}
            isEnabled={false}
            minReviewLength={50}
            maxReviewLength={300}
            onRatingChange={() => null}
            onReviewChange={() => null}
            onReviewSubmit={() => null}
          />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

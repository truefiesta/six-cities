import * as React from "react";
import * as renderer from "react-test-renderer";
import PropTypes from "prop-types";
import withReview from "./with-review.js";

const MockComponent = (props) => {
  const {reviewError, review, rating, isEnabled, minReviewLength, maxReviewLength, onRatingChange, onReviewChange, onReviewSubmit} = props;
  return (
    <div>
      <span id="error">{reviewError}</span>
      <span id="review">{review}</span>
      <span id="rating">{rating}</span>
      <span id="isEnabled">{isEnabled ? `Enabled` : `Disabled`}</span>
      <span id="minLength">{minReviewLength}</span>
      <span id="maxLength">{maxReviewLength}</span>
      <span id="rating-change" onClick={onRatingChange}/>
      <span id="review-change" onClick={onReviewChange}/>
      <span id="review-submit" onClick={onReviewSubmit}/>
    </div>
  );
};

MockComponent.propTypes = {
  reviewError: PropTypes.string,
  review: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  minReviewLength: PropTypes.number.isRequired,
  maxReviewLength: PropTypes.number.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onReviewChange: PropTypes.func.isRequired,
  onReviewSubmit: PropTypes.func.isRequired,
};

const MockComponentWrapped = withReview(MockComponent);

describe(`withReview`, () => {
  describe(`renders correctly`, () => {
    it(`when rating and review haven't been changed`, () => {
      const tree = renderer.create(
          <MockComponentWrapped
            offerId={2}
            onSubmit={()=>null}
          />
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

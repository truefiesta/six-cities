import React from "react";
import PropTypes from "prop-types";
import Stars from "../stars/stars.jsx";
import withReview from "../../hocs/with-review/with-review.js";

const RATING = `rating`;

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

const ReviewForm = (props) => {
  const {reviewError, review, rating, isEnabled, minReviewLength, maxReviewLength, onRatingChange, onReviewChange, onReviewSubmit} = props;

  return (
    <form
      className="reviews__form form"
      action=""
      method="post"
      onSubmit={(evt) => {
        evt.preventDefault();
        onReviewSubmit();
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      {reviewError && <span style={{backgroundColor: `red`}}>{reviewError}</span>}
      <Stars
        setName={RATING}
        setOptions={ratingOptions}
        selectedOption={rating}
        onSelectedOptionChange={onRatingChange}
      />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        minLength={minReviewLength}
        maxLength={maxReviewLength}
        value={review}
        onChange={(evt) => {
          onReviewChange(evt.target.value);
        }}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isEnabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  reviewError: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  minReviewLength: PropTypes.number.isRequired,
  maxReviewLength: PropTypes.number.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onReviewChange: PropTypes.func.isRequired,
  onReviewSubmit: PropTypes.func.isRequired,
};

export {ReviewForm};
export default withReview(ReviewForm);

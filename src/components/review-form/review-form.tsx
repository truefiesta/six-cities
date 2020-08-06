import * as React from "react";
import Stars from "../stars/stars";
import withReview from "../../hocs/with-review/with-review";

interface Props {
  reviewError: string;
  review: string;
  rating: number;
  isEnabled: boolean;
  isBlocked: boolean;
  minReviewLength: number;
  maxReviewLength: number;
  onRatingChange: () => void;
  onReviewChange: (reviewText: string) => void;
  onReviewSubmit: () => void;
}

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

const errorStyle: React.CSSProperties = {
  backgroundColor: `#e23939`,
  marginBottom: `10px`,
  padding: `5px`,
  color: `#fff`,
  textAlign: `center`,
  lineHeight: `15px`,
  fontSize: `15px`,
  borderRadius: `2px`,
};

const ReviewForm: React.FunctionComponent<Props> = (props: Props) => {
  const {reviewError, review, rating, isEnabled, isBlocked, minReviewLength, maxReviewLength, onRatingChange, onReviewChange, onReviewSubmit} = props;

  return (
    <form
      className="reviews__form form"
      method="post"
      onSubmit={(evt) => {
        evt.preventDefault();
        onReviewSubmit();
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      {reviewError && <div style={errorStyle}>{reviewError}</div>}
      <Stars
        setName={RATING}
        setOptions={ratingOptions}
        selectedOption={rating}
        onSelectedOptionChange={onRatingChange}
        isBlocked={isBlocked}
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
          const reviewText = evt.target.value;
          onReviewChange(reviewText);
        }}
        disabled={isBlocked}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isBlocked ? isBlocked : !isEnabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export {ReviewForm};
export default withReview(ReviewForm);

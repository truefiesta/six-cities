import React, {Component} from "react";
import Stars from "../stars/stars.jsx";
import PropTypes from "prop-types";

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

const MIN_LENGTH = 50;
const MAX_LENGTH = 300;

class ReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      review: ``,
      rating: 0,
    };

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormClear = this._handleFormClear.bind(this);
    this._handleReviewChange = this._handleReviewChange.bind(this);
    this._handleRatingChange = this._handleRatingChange.bind(this);
    this._validateForm = this._validateForm.bind(this);
  }

  _handleFormSubmit(evt) {
    if (!this._validateForm()) {
      evt.preventDefault();
      return;
    }

    const {onSubmit, offerId} = this.props;

    onSubmit({
      comment: this.state.review,
      rating: this.state.rating,
    }, offerId);

    this._handleFormClear(evt);
  }

  _handleFormClear(evt) {
    evt.preventDefault();

    this.setState({
      review: ``,
      rating: 0,
    });
  }

  _handleReviewChange(evt) {
    const newReview = evt.target.value;
    this.setState({review: newReview});
  }

  _handleRatingChange(evt) {
    const newRating = parseInt(evt.target.value, 10);
    this.setState({rating: newRating});
  }

  _validateForm() {
    const {rating, review} = this.state;
    return (
      rating > 0 && review.length >= MIN_LENGTH
    );
  }

  render() {
    const isEnabled = this._validateForm();

    return (
      <form
        className="reviews__form form"
        action=""
        method="post"
        onSubmit={this._handleFormSubmit}
      >
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <Stars
          setName={RATING}
          setOptions={ratingOptions}
          selectedOption={this.state.rating}
          onSelectedOptionChange={this._handleRatingChange}
        />
        <textarea
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          minLength={MIN_LENGTH}
          maxLength={MAX_LENGTH}
          value={this.state.review}
          onChange={this._handleReviewChange}
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
  }
}

ReviewForm.propTypes = {
  offerId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ReviewForm;

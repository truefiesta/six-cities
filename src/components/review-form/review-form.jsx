import React, {PureComponent} from "react";
import Stars from "../stars/stars.jsx";

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

class ReviewForm extends PureComponent {
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
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();

    // const reviewToSubmit = {
    //   review: this.state.review,
    //   rating: this.state.rating,
    // };

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
    this.setState({review: evt.target.value});
  }

  _handleRatingChange(evt) {
    const newRating = parseInt(evt.target.value, 10);
    this.setState({rating: newRating});
  }

  render() {
    return (
      <form
        className="reviews__form form"
        action="#"
        method="post"
        onSubmit={() => null}
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
          value={this.state.value}
          onChange={this._handleReviewChange}
        />

        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
        </div>
      </form>
    );
  }
}

export default ReviewForm;

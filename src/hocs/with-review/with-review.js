import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const MIN_LENGTH = 50;
const MAX_LENGTH = 300;

const withReview = (Component) => {
  class WithReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        message: ``,
        rating: 0,
      };

      this._handleReviewSubmit = this._handleReviewSubmit.bind(this);
      this._handleReviewChange = this._handleReviewChange.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
    }

    _handleReviewSubmit() {
      if (!this._validateReview()) {
        return;
      }

      const {onSubmit, offerId} = this.props;

      onSubmit({
        comment: this.state.message,
        rating: this.state.rating,
      }, offerId);

      this._crearReview();
    }

    _crearReview() {
      this.setState({
        message: ``,
        rating: 0,
      });
    }

    _handleReviewChange(newMessage) {
      this.setState({message: newMessage});
    }

    _handleRatingChange(newRating) {
      this.setState({rating: newRating});
    }

    _validateReview() {
      const {rating, message} = this.state;
      return (
        rating > 0 && message.length >= MIN_LENGTH && message.length <= MAX_LENGTH
      );
    }

    render() {
      const {message, rating} = this.state;

      return (
        <Component
          {...this.props}
          review={message}
          rating={rating}
          isEnabled={this._validateReview()}
          minReviewLength={MIN_LENGTH}
          maxReviewLength={MAX_LENGTH}
          onRatingChange={this._handleRatingChange}
          onReviewChange={this._handleReviewChange}
          onReviewSubmit={this._handleReviewSubmit}
        />
      );
    }
  }

  WithReview.propTypes = {
    offerId: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  return WithReview;
};

export default withReview;

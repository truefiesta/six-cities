import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const ReviewTextLength = {
  MIN: 50,
  MAX: 300,
};

const withReview = (Component) => {
  class WithReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        message: ``,
        rating: 0,
        isBlocked: false,
      };

      this._handleReviewSubmit = this._handleReviewSubmit.bind(this);
      this._handleReviewChange = this._handleReviewChange.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
    }

    _handleReviewSubmit() {
      if (!this._validateReview()) {
        return;
      }

      this.setState({
        isBlocked: true
      });

      const {onSubmit, offerId} = this.props;

      const onSubmitSuccess = () => {
        this._clearReview();
      };

      const onSubmitError = () => {
        this.setState({
          isBlocked: false,
        });
      };

      onSubmit({
        comment: this.state.message,
        rating: this.state.rating,
      }, offerId, onSubmitSuccess, onSubmitError);
    }

    _clearReview() {
      this.setState({
        message: ``,
        rating: 0,
        isBlocked: false,
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
        rating > 0 && message.length >= ReviewTextLength.MIN && message.length <= ReviewTextLength.MAX
      );
    }

    render() {
      const {message, rating, isBlocked} = this.state;

      return (
        <Component
          {...this.props}
          review={message}
          rating={rating}
          isEnabled={this._validateReview()}
          isBlocked={isBlocked}
          minReviewLength={ReviewTextLength.MIN}
          maxReviewLength={ReviewTextLength.MAX}
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

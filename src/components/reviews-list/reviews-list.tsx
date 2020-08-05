import * as React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Review from "../review/review.jsx";

const sortReviewsByDate = (reviews) => {
  return reviews.sort((reviewA, reviewB) => {
    const isSameDate = moment(reviewB.date) - moment(reviewA.date) === 0;
    if (isSameDate) {
      return reviewB.id - reviewA.id;
    } else {
      return moment(reviewB.date) - moment(reviewA.date);
    }
  });
};

const ReviewsList = ({reviews}) => {
  const reviewsToShow = sortReviewsByDate(reviews).slice(0, 10);

  return (
    <ul className="reviews__list">
      {reviewsToShow.map((review) => {
        return (
          <Review
            key={review.id}
            review={review}
          />
        );
      })}
    </ul>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        user: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
        date: PropTypes.string.isRequired,
      })
  ).isRequired,
};

export default ReviewsList;

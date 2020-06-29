import React from "react";
import PropTypes from "prop-types";
import Review from "../review/review.jsx";
import moment from "moment";

const sortReviewsByDate = (reviews) => {
  return reviews.sort((reviewA, reviewB) => {
    return moment(reviewB.date) - moment(reviewA.date);
  });
};

const ReviewsList = (props) => {
  const {reviews} = props;
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
        id: PropTypes.string.isRequired,
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

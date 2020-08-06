import * as React from "react";
import {Review as ReviewType} from "../../types";
import {sortReviewsByDate} from "../../utils";
import Review from "../review/review";

interface Props {
  reviews: ReviewType[];
}

const ReviewsList: React.FunctionComponent<Props> = (props: Props) => {
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

export default ReviewsList;

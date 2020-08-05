import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import PropTypes from "prop-types";
import {configure, mount} from "enzyme";
import withReview from "./with-review.js";

configure({
  adapter: new Adapter(),
});

const newRating = 2;
const newReview = `A quiet cozy and picturesque that hides behind a a river by the unique`;

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
      <span id="rating-change" onClick={() => onRatingChange(newRating)}/>
      <span id="review-change" onClick={() => onReviewChange(newReview)}/>
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
    it(`has initial review and rating`, () => {
      const wrapper = mount(<MockComponentWrapped offerId={2} onSubmit={()=>null} />);
      expect(wrapper.find(`#review`).text()).toBe(``);
      expect(wrapper.find(`#rating`).text()).toBe(`0`);
    });

    it(`has minLength and maxLength`, () => {
      const wrapper = mount(<MockComponentWrapped offerId={2} onSubmit={()=>null} />);
      expect(wrapper.find(`#minLength`).text()).toBe(`50`);
      expect(wrapper.find(`#maxLength`).text()).toBe(`300`);
    });

    it(`has correct Enabled/Disabled values`, () => {
      const wrapper = mount(<MockComponentWrapped offerId={2} onSubmit={()=>null} />);
      expect(wrapper.find(`#isEnabled`).text()).toBe(`Disabled`);
      wrapper.find(`#rating-change`).simulate(`click`);
      wrapper.find(`#review-change`).simulate(`click`);
      expect(wrapper.find(`#isEnabled`).text()).toBe(`Enabled`);
    });
  });

  describe(`handlers work correctly`, () => {
    it(`triggers onRatingChange`, () => {
      const wrapper = mount(<MockComponentWrapped offerId={2} onSubmit={()=>null} />);
      wrapper.find(`#rating-change`).simulate(`click`);
      expect(wrapper.find(`#rating`).text()).toBe(`${newRating}`);
    });

    it(`triggers onReviewChange`, () => {
      const wrapper = mount(<MockComponentWrapped offerId={2} onSubmit={()=>null} />);
      wrapper.find(`#review-change`).simulate(`click`);
      expect(wrapper.find(`#review`).text()).toBe(`${newReview}`);
    });

    it(`triggers onReviewSubmit`, () => {
      const onSubmit = jest.fn();
      const offerId = 2;

      const wrapper = mount(<MockComponentWrapped offerId={offerId} onSubmit={onSubmit} />);
      wrapper.find(`#rating-change`).simulate(`click`);
      wrapper.find(`#review-change`).simulate(`click`);
      wrapper.find(`#review-submit`).simulate(`click`);

      expect(onSubmit).toHaveBeenCalledWith(
          {
            comment: newReview,
            rating: newRating
          },
          offerId,
          expect.anything(),
          expect.anything()
      );
    });
  });
});

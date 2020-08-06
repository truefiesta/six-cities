import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, shallow} from "enzyme";
import withReview, {ReviewTextLength} from "./with-review";

configure({
  adapter: new Adapter(),
});

const newRating = 2;
const newReview = `A quiet cozy and picturesque that hides behind a a river by the unique`;

const MockComponent = () => <div />;
const MockComponentWrapped = withReview(MockComponent);

describe(`withReview`, () => {
  it(`has initial review, rating and isBlocked`, () => {
    const wrapper = shallow(<MockComponentWrapped offerId={2} onSubmit={()=>null} />);

    expect(wrapper.props().review).toEqual(``);
    expect(wrapper.props().rating).toEqual(0);
    expect(wrapper.props().isBlocked).toEqual(false);
  });

  it(`has minLength and maxLength`, () => {
    const wrapper = shallow(<MockComponentWrapped offerId={2} onSubmit={()=>null} />);
    expect(wrapper.props().minReviewLength).toEqual(ReviewTextLength.MIN);
    expect(wrapper.props().maxReviewLength).toEqual(ReviewTextLength.MAX);
  });

  it(`can change rating and review and sets correct isEnabled value`, () => {
    const wrapper = shallow(<MockComponentWrapped offerId={2} onSubmit={()=>null} />);
    expect(wrapper.props().isEnabled).toEqual(false);
    wrapper.props().onRatingChange(newRating);
    expect(wrapper.props().isEnabled).toEqual(false);
    wrapper.props().onReviewChange(newReview);
    expect(wrapper.props().isEnabled).toEqual(true);
  });

  it(`submits review`, () => {
    const onSubmit = jest.fn();
    const offerId = 2;

    const wrapper = shallow(<MockComponentWrapped offerId={offerId} onSubmit={onSubmit} />);
    wrapper.props().onRatingChange(newRating);
    wrapper.props().onReviewChange(newReview);
    wrapper.props().onReviewSubmit();

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

import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, mount} from "enzyme";
import {ReviewForm} from "./review-form.jsx";

configure({
  adapter: new Adapter(),
});

describe(`ReviewForm`, () => {
  it(`calls onReviewSubmit on click`, () => {
    const onReviewSubmit = jest.fn();

    const reviewFormComponent = mount(
        <ReviewForm
          reviewError={``}
          review={`Nice and cozy apartment near the city center and with a nice view`}
          rating={4}
          isEnabled={false}
          isBlocked={false}
          minReviewLength={50}
          maxReviewLength={300}
          onRatingChange={() => null}
          onReviewChange={() => null}
          onReviewSubmit={onReviewSubmit}
        />
    );

    const reviewForm = reviewFormComponent.find(`form`);
    expect(reviewForm).toHaveLength(1);

    reviewForm.simulate(`submit`, {preventDefault() {}});
    expect(onReviewSubmit).toHaveBeenCalledTimes(1);
  });

  it(`calls onReviewChange on click`, () => {
    const onReviewChange = jest.fn();

    const reviewFormComponent = mount(
        <ReviewForm
          reviewError={``}
          review={``}
          rating={4}
          isEnabled={false}
          isBlocked={false}
          minReviewLength={50}
          maxReviewLength={300}
          onRatingChange={() => null}
          onReviewChange={onReviewChange}
          onReviewSubmit={() => null}
        />
    );

    const reviewMessage = reviewFormComponent.find(`textarea`);
    expect(reviewMessage).toHaveLength(1);

    reviewMessage.instance().value = `New Review Text`;
    reviewMessage.simulate(`change`);
    expect(onReviewChange).toHaveBeenCalledWith(`New Review Text`);
  });
});

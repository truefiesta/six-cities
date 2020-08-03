import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {BookmarkButton} from "./bookmark-button.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`BookmarkButton`, () => {
  it(`calls onBookmarkStatusChange on click`, () => {
    const offerId = 5;
    const onBookmarkStatusChange = jest.fn();
    const isBookmarked = false;

    const bookmarkButton = mount(
        <BookmarkButton
          offerId={offerId}
          isBookmarked={isBookmarked}
          buttonStyle={`FooBar`}
          onBookmarkStatusChange={onBookmarkStatusChange}
        />
    );

    const button = bookmarkButton.find(`button`);
    expect(button).toHaveLength(1);

    button.simulate(`click`);
    expect(onBookmarkStatusChange).toHaveBeenCalledWith(offerId, !isBookmarked);
  });
});

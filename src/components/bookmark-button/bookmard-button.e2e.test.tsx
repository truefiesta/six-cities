import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, mount} from "enzyme";
import {BookmarkButton} from "./bookmark-button";

configure({
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

import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {BookmarkStyle} from "../../const.js";
import BookmarkButton from "./bookmark-button.jsx";

const mockStore = configureStore([]);
const store = mockStore({});
const offer = {id: 1};

describe(`BookmarkButton snapshot`, () => {
  it(`should render with small button and with "To bookmarks" text`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <BookmarkButton
            offerId={offer.id}
            isBookmarked={false}
            buttonStyle={BookmarkStyle.SMALL_BUTTON}
          />
        </Provider>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render with big button and with "In bookmarks" text`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <BookmarkButton
            offerId={offer.id}
            isBookmarked={true}
            buttonStyle={BookmarkStyle.BIG_BUTTON}
          />
        </Provider>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

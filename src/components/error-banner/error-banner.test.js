import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {NameSpace} from "../../reducer/name-space.js";
import ErrorBanner from "./error-banner.jsx";

const mockStore = configureStore([]);

describe(`ErrorBanner snapshot`, () => {
  it(`should not render`, () => {
    const store = mockStore({
      [NameSpace.ERROR]: {
        errorMessage: ``,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <ErrorBanner/>
        </Provider>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render`, () => {
    const store = mockStore({
      [NameSpace.ERROR]: {
        errorMessage: `New Error Text`,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <ErrorBanner/>
        </Provider>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

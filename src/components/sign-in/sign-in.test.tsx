import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.jsx";

describe(`SignIn snapshot`, () => {
  it(`should render`, () => {
    const tree = renderer.create(
        <SignIn
          onSubmit={() => null}
        />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

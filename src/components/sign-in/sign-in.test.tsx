import * as React from "react";
import * as renderer from "react-test-renderer";
import SignIn from "./sign-in";

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

import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.jsx";

describe(`SignIn`, () => {
  describe(`when the user is not authorized`, () => {
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
});

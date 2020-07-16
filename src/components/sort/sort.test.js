import React from "react";
import renderer from "react-test-renderer";
import Sort from "./sort.jsx";
import {SortTypes} from "../../const.js";

describe(`Sort`, () => {
  describe(`when the offers is not empty array`, () => {
    it(`should render with correctly`, () => {
      const tree = renderer.create(
          <Sort
            currentSortType={SortTypes.POPULAR}
            onSortTypeChange={() => null}
          />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

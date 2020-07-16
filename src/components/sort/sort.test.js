import React from "react";
import renderer from "react-test-renderer";
import Sort from "./sort.jsx";
import {SortTypes} from "../../const.js";

describe(`Sort`, () => {
  describe(`when the offers is not empty array`, () => {
    it(`should render with correctly`, () => {
      const tree = renderer.create(
          <Sort
            isOpen={false}
            currentSortType={SortTypes.POPULAR}
            onSortTypeChange={() => null}
            onComponentClick={() => null}
            onComponentChildClick={() => null}
          />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

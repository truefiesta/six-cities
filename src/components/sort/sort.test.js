import React from "react";
import renderer from "react-test-renderer";
import {Sort} from "./sort.jsx";
import {SortType} from "../../const.js";

describe(`Sort`, () => {
  describe(`when the offers is not empty array`, () => {
    it(`should render with correctly`, () => {
      const tree = renderer.create(
          <Sort
            isOpen={false}
            currentSortType={SortType.POPULAR}
            onSortTypeChange={() => null}
            onOpenStateToggle={() => null}
            onClose={() => null}
          />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

import * as React from "react";
import * as renderer from "react-test-renderer";
import {Sort} from "./sort.jsx";
import {SortType} from "../../const.js";

describe(`Sort snapshot`, () => {
  it(`should render`, () => {
    const sortComponent = renderer.create(
        <Sort
          isOpen={false}
          currentSortType={SortType.POPULAR}
          onSortTypeChange={() => null}
          onOpenStateToggle={() => null}
          onClose={() => null}
        />
    )
    .toJSON();

    expect(sortComponent).toMatchSnapshot();
  });
});

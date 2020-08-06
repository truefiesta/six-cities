import * as React from "react";
import * as renderer from "react-test-renderer";
import {SortType} from "../../const";
import {Sort} from "./sort";

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

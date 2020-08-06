import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, shallow} from "enzyme";
import {SortType, KeyCode} from "../../const";
import {Sort} from "./sort";

configure({
  adapter: new Adapter(),
});

describe(`Sort`, () => {
  it(`triggers onOpenStateToggle callback on click`, () => {
    const onOpenStateToggle = jest.fn();

    const sortComponent = shallow(
        <Sort
          isOpen={true}
          currentSortType={SortType.POPULAR}
          onOpenStateToggle={onOpenStateToggle}
          onClose={() => null}
          onSortTypeChange={() => null}
        />
    );

    expect(onOpenStateToggle).toHaveBeenCalledTimes(0);
    sortComponent.find(`.places__sorting-type`).simulate(`click`);
    expect(onOpenStateToggle).toHaveBeenCalledTimes(1);
  });

  it(`triggers onOpenStateToggle callback on Spacebar key down`, () => {
    const onOpenStateToggle = jest.fn();

    const sortComponent = shallow(
        <Sort
          isOpen={true}
          currentSortType={SortType.POPULAR}
          onOpenStateToggle={onOpenStateToggle}
          onClose={() => null}
          onSortTypeChange={() => null}
        />
    );

    expect(onOpenStateToggle).toHaveBeenCalledTimes(0);
    sortComponent.find(`.places__sorting-type`).simulate(`keyDown`, {keyCode: KeyCode.SPACEBAR});
    expect(onOpenStateToggle).toHaveBeenCalledTimes(1);
  });

  it(`triggers onClose callback on click`, () => {
    const onClose = jest.fn();

    const sortComponent = shallow(
        <Sort
          isOpen={true}
          currentSortType={SortType.POPULAR}
          onOpenStateToggle={() => null}
          onClose={onClose}
          onSortTypeChange={() => null}
        />
    );

    expect(onClose).toHaveBeenCalledTimes(0);
    const li = sortComponent.find(`ul`).childAt(2);
    expect(li.type()).toEqual(`li`);
    li.simulate(`click`);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it(`triggers onClose callback on Enter key down`, () => {
    const onClose = jest.fn();

    const sortComponent = shallow(
        <Sort
          isOpen={true}
          currentSortType={SortType.POPULAR}
          onOpenStateToggle={() => null}
          onClose={onClose}
          onSortTypeChange={() => null}
        />
    );

    expect(onClose).toHaveBeenCalledTimes(0);
    const li = sortComponent.find(`ul`).childAt(2);
    expect(li.type()).toEqual(`li`);
    li.simulate(`keyDown`, {keyCode: KeyCode.ENTER});
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it(`triggers onSortTypeChange callback on click`, () => {
    const onSortTypeChange = jest.fn();

    const sortComponent = shallow(
        <Sort
          isOpen={true}
          currentSortType={SortType.POPULAR}
          onOpenStateToggle={() => null}
          onClose={() => null}
          onSortTypeChange={onSortTypeChange}
        />
    );

    expect(onSortTypeChange).toHaveBeenCalledTimes(0);
    const liWithTypeTopRated = sortComponent.find(`ul`).childAt(3);
    expect(liWithTypeTopRated.text()).toEqual(`Top rated first`);
    liWithTypeTopRated.simulate(`click`);
    expect(onSortTypeChange).toHaveBeenCalledTimes(1);
    expect(onSortTypeChange).toHaveBeenCalledWith(SortType.TOP_RATED_FIRST);
  });

  it(`triggers onSortTypeChange callback on Enter key down`, () => {
    const onSortTypeChange = jest.fn();

    const sortComponent = shallow(
        <Sort
          isOpen={true}
          currentSortType={SortType.POPULAR}
          onOpenStateToggle={() => null}
          onClose={() => null}
          onSortTypeChange={onSortTypeChange}
        />
    );

    expect(onSortTypeChange).toHaveBeenCalledTimes(0);
    const liWithTypeTopRated = sortComponent.find(`ul`).childAt(3);
    expect(liWithTypeTopRated.text()).toEqual(`Top rated first`);
    liWithTypeTopRated.simulate(`keyDown`, {keyCode: KeyCode.ENTER});
    expect(onSortTypeChange).toHaveBeenCalledTimes(1);
  });
});

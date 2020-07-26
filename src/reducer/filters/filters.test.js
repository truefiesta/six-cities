import {reducer, ActionCreator, ActionType, initialState} from "./filters.js";
import {CityName, SortTypes} from "../../const.js";

describe(`Action creators`, () => {
  describe(`action changeCity`, () => {
    it(`returns correct type and payload`, () => {
      const city = CityName.COLOGNE;

      expect(ActionCreator.changeCity(city)).toEqual({
        type: ActionType.CHANGE_CITY,
        payload: city,
      });
    });
  });

  describe(`action changeSortType`, () => {
    it(`returns correct type and payload`, () => {
      const sortType = SortTypes.TOP_RATED_FIRST;

      expect(ActionCreator.changeSortType(sortType)).toEqual({
        type: ActionType.CHANGE_SORT_TYPE,
        payload: sortType,
      });
    });
  });

  describe(`action changeActiveCard`, () => {
    it(`returns correct type and payload`, () => {
      const activeOffer = {offerId: 34};

      expect(ActionCreator.changeActiveCard(activeOffer)).toEqual({
        type: ActionType.CHANGE_ACTIVE_CARD,
        payload: activeOffer,
      });
    });
  });
});

describe(`Reducer`, () => {
  it(`without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe(`action changeCity`, () => {
    it(`sets new city`, () => {
      const originalState = Object.assign({}, initialState, {city: CityName.AMSTERDAM});
      const newCity = CityName.BRUSSELS;
      const expectedState = Object.assign({}, originalState, {city: newCity});

      expect(
          reducer(originalState, ActionCreator.changeCity(newCity))
      ).toEqual(expectedState);
    });
  });

  describe(`action changeSortType`, () => {
    it(`sets new sort type`, () => {
      const originalState = Object.assign({}, initialState, {sortType: SortTypes.POPULAR});
      const newSortType = SortTypes.TOP_RATED_FIRST;
      const expectedState = Object.assign({}, originalState, {sortType: newSortType});

      expect(
          reducer(originalState, ActionCreator.changeSortType(newSortType))
      ).toEqual(expectedState);
    });
  });

  describe(`action changeActiveCard`, () => {
    it(`sets new active offer`, () => {
      const originalState = Object.assign({}, initialState, {activeCard: {offerId: 1}});
      const newOffer = {offerId: 34};
      const expectedState = Object.assign({}, originalState, {activeCard: newOffer});

      expect(
          reducer(originalState, ActionCreator.changeActiveCard(newOffer))
      ).toEqual(expectedState);
    });
  });
});

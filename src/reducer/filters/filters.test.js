import {reducer, ActionCreator, ActionType} from "./filters.js";
import {CityName, SortTypes} from "../../const.js";

describe(`Action creators work correctly`, () => {
  describe(`Action creator for changing city`, () => {
    it(`returns payload: Paris, when city changes to Paris`, () => {
      expect(ActionCreator.changeCity(CityName.PARIS)).toEqual({
        type: ActionType.CHANGE_CITY,
        payload: CityName.PARIS,
      });
    });

    it(`returns payload: Amsterdam, when city changes to Amsterdam`, () => {
      expect(ActionCreator.changeCity(CityName.AMSTERDAM)).toEqual({
        type: ActionType.CHANGE_CITY,
        payload: CityName.AMSTERDAM,
      });
    });
  });
});

describe(`Reducer`, () => {
  it(`without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      activeCard: null,
      city: null,
      sortType: SortTypes.POPULAR,
    });
  });

  it(`with no state and action type change city returns city and empty array of offers`, () => {
    expect(reducer(undefined, ActionCreator.changeCity(CityName.PARIS))).toEqual({
      activeCard: null,
      city: CityName.PARIS,
      sortType: SortTypes.POPULAR,
    });
  });

  it(`with state and action type change city returns new city`, () => {
    const state = {
      activeCard: null,
      city: CityName.AMSTERDAM,
      sortType: SortTypes.POPULAR,
    };

    expect(reducer(state, ActionCreator.changeCity(CityName.PARIS))).toEqual({
      activeCard: null,
      city: CityName.PARIS,
      sortType: SortTypes.POPULAR,
    });
  });
});

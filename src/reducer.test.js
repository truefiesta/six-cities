import {reducer, ActionCreator, ActionType} from "./reducer.js";
import {CityName} from "./const.js";

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

  describe(`Action creator setting offers`, () => {
    it(`returns payload: offers, when setting offers`, () => {
      const offers = [{offerId: 1}, {offerId: 2}, {offerId: 3}];

      expect(ActionCreator.setAllOffers(offers)).toEqual({
        type: ActionType.SET_ALL_OFFERS,
        payload: [{offerId: 1}, {offerId: 2}, {offerId: 3}],
      });
    });

    it(`returns payload: [], when offers is an empty array`, () => {
      expect(ActionCreator.setAllOffers([])).toEqual({
        type: ActionType.SET_ALL_OFFERS,
        payload: [],
      });
    });
  });
});

describe(`Reducer`, () => {
  it(`without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      city: null,
      offers: [],
    });
  });

  it(`with no state and action type change city returns city and empty array of offers`, () => {
    expect(reducer(undefined, ActionCreator.changeCity(CityName.PARIS))).toEqual({
      city: CityName.PARIS,
      offers: [],
    });
  });

  it(`with no state and action type set offers returns city null and array of offers`, () => {
    const offers = [{offerId: 1}, {offerId: 2}, {offerId: 3}];

    expect(reducer(undefined, ActionCreator.setAllOffers(offers))).toEqual({
      city: null,
      offers: [{offerId: 1}, {offerId: 2}, {offerId: 3}],
    });
  });

  it(`with state and action type change city returns new city and same array of offers`, () => {
    const state = {
      city: CityName.AMSTERDAM,
      offers: [{offerId: 1}, {offerId: 2}, {offerId: 3}],
    };

    expect(reducer(state, ActionCreator.changeCity(CityName.PARIS))).toEqual({
      city: CityName.PARIS,
      offers: [{offerId: 1}, {offerId: 2}, {offerId: 3}],
    });
  });

  it(`with state and action type set offers returns same city and new array of offers`, () => {
    const state = {
      city: CityName.AMSTERDAM,
      offers: [{offerId: 1}, {offerId: 2}, {offerId: 3}],
    };

    expect(reducer(state, ActionCreator.setAllOffers([{offerId: 1}]))).toEqual({
      city: CityName.AMSTERDAM,
      offers: [{offerId: 1}],
    });
  });
});

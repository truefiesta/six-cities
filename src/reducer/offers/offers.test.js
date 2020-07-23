import {reducer, ActionCreator, ActionType} from "./offers.js";

describe(`Action creators work correctly`, () => {
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
      offers: [],
      currentOfferReviews: [],
      currentOffersNearby: [],
    });
  });

  it(`with no state and action type set offers returns an array of offers`, () => {
    const offers = [{offerId: 1}, {offerId: 2}, {offerId: 3}];

    expect(reducer(undefined, ActionCreator.setAllOffers(offers))).toEqual({
      offers: [{offerId: 1}, {offerId: 2}, {offerId: 3}],
      currentOfferReviews: [],
      currentOffersNearby: [],
    });
  });

  it(`with state and action type set offers returns new array of offers`, () => {
    const state = {
      offers: [{offerId: 1}, {offerId: 2}, {offerId: 3}],
      currentOfferReviews: [],
      currentOffersNearby: [],
    };

    expect(reducer(state, ActionCreator.setAllOffers([{offerId: 1}]))).toEqual({
      offers: [{offerId: 1}],
      currentOfferReviews: [],
      currentOffersNearby: [],
    });
  });
});

import {reducer, ActionCreator, ActionType, Operation, initialState} from "./offers.js";
import MockAdapter from "axios-mock-adapter";
import {createApi} from "../../api.js";
import {createOffer, createReview} from "../../adapters/adapters.js";
import {ActionCreator as FiltersActionCreator} from "../filters/filters.js";
import {NameSpace} from "../name-space.js";

const api = createApi(() => {});

const hotel1 = {
  "bedrooms": 3,
  "city": {
    "location": {
      "latitude": 52.370216,
      "longitude": 4.895168,
      "zoom": 10
    },
    "name": `Amsterdam`
  },
  "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  "host": {
    "avatar_url": `img/1.png`,
    "id": 3,
    "is_pro": true,
    "name": `Angelina`
  },
  "id": 1,
  "images": [`img/1.png`, `img/2.png`],
  "is_favorite": false,
  "is_premium": false,
  "location": {
    "latitude": 52.35514938496378,
    "longitude": 4.673877537499948,
    "zoom": 8
  },
  "max_adults": 4,
  "preview_image": `img/1.png`,
  "price": 120,
  "rating": 4.8,
  "title": `Beautiful & luxurious studio at great location`,
  "type": `apartment`
};

const hotel2 = {
  "bedrooms": 2,
  "city": {
    "location": {
      "latitude": 52.370216,
      "longitude": 4.895168,
      "zoom": 10
    },
    "name": `Paris`
  },
  "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  "host": {
    "avatar_url": `img/1.png`,
    "id": 3,
    "is_pro": true,
    "name": `Angelina`
  },
  "id": 2,
  "images": [`img/1.png`, `img/2.png`],
  "is_favorite": true,
  "is_premium": true,
  "location": {
    "latitude": 52.35514938496378,
    "longitude": 4.673877537499948,
    "zoom": 8
  },
  "max_adults": 4,
  "preview_image": `img/1.png`,
  "price": 120,
  "rating": 4.8,
  "title": `Beautiful & luxurious studio at great location`,
  "type": `apartment`
};

const comment1 = {
  "comment": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  "date": `2019-05-08T14:13:56.569Z`,
  "id": 1,
  "rating": 4,
  "user": {
    "avatar_url": `img/1.png`,
    "id": 4,
    "is_pro": false,
    "name": `Max`
  }
};

const comment2 = {
  "comment": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  "date": `2019-05-10T14:13:56.569Z`,
  "id": 2,
  "rating": 3,
  "user": {
    "avatar_url": `img/1.png`,
    "id": 1,
    "is_pro": false,
    "name": `Irene`
  }
};

describe(`Action creators`, () => {
  describe(`Action setReviewError`, () => {
    it(`returns correct type and payload`, () => {
      const err = `New Error Message`;

      expect(ActionCreator.setReviewError(err)).toEqual({
        type: ActionType.SET_REVIEW_ERROR,
        payload: err,
      });
    });
  });

  describe(`Action setAllOffers`, () => {
    it(`returns correct type and payload`, () => {
      const offers = [{offerId: 1}, {offerId: 2}, {offerId: 3}];

      expect(ActionCreator.setAllOffers(offers)).toEqual({
        type: ActionType.SET_ALL_OFFERS,
        payload: offers,
      });
    });
  });

  describe(`Action changeCurrentOfferReviews`, () => {
    it(`returns correct type and payload`, () => {
      const reviews = [{id: 1}, {id: 2}, {id: 3}];

      expect(ActionCreator.changeCurrentOfferReviews(reviews)).toEqual({
        type: ActionType.CHANGE_CURRENT_OFFER_REVIEWS,
        payload: reviews,
      });
    });
  });

  describe(`Action changeCurrentOffersNearby`, () => {
    it(`returns correct type and payload`, () => {
      const offersNearby = [{id: 1}, {id: 2}, {id: 3}];

      expect(ActionCreator.changeCurrentOffersNearby(offersNearby)).toEqual({
        type: ActionType.CHANGE_CURRENT_OFFERS_NEARBY,
        payload: offersNearby,
      });
    });
  });

  describe(`Action changeCurrentBookmarkedOffers`, () => {
    it(`returns correct type and payload`, () => {
      const bookmarkedOffers = [{id: 1}, {id: 2}, {id: 3}];

      expect(ActionCreator.changeCurrentBookmarkedOffers(bookmarkedOffers)).toEqual({
        type: ActionType.CHANGE_CURRENT_BOOKMARKED_OFFERS,
        payload: bookmarkedOffers,
      });
    });
  });
});

describe(`Operation loadOffers`, () => {
  it(`Should make a correct API call to /hotels`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const getState = () =>({
      [NameSpace.OFFERS]: {
        offers: [
          {city: {name: hotel1.city.name}},
          {city: {name: hotel2.city.name}},
        ]
      }
    });
    const loadOffers = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, [
        hotel1,
        hotel2
      ]);

    return loadOffers(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1,
            ActionCreator.setAllOffers([createOffer(hotel1), createOffer(hotel2)])
        );
        expect(dispatch).toHaveBeenNthCalledWith(2,
            FiltersActionCreator.changeCity(hotel1.city.name)
        );
      });
  });
});

describe(`Operation loadOfferReviews`, () => {
  it(`Should make a correct API call to /comments/123`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 123;
    const loadOfferReviews = Operation.loadOfferReviews(offerId);

    apiMock
      .onGet(`/comments/${offerId}`)
      .reply(200, [
        comment1,
        comment2
      ]);

    return loadOfferReviews(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1,
            ActionCreator.changeCurrentOfferReviews([createReview(comment1), createReview(comment2)])
        );
      });
  });
});

describe(`Operation loadOffersNearby`, () => {
  it(`Should make a correct API call to /hotels/123/nearby`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 123;
    const loadOffersNearby = Operation.loadOffersNearby(offerId);

    apiMock
      .onGet(`/hotels/${offerId}/nearby`)
      .reply(200, [
        hotel1,
        hotel2
      ]);

    return loadOffersNearby(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1,
            ActionCreator.changeCurrentOffersNearby([createOffer(hotel1), createOffer(hotel2)])
        );
      });
  });
});

describe(`Operation loadBookmarkedOffers`, () => {
  it(`Should make a correct API call to /favorite`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loadBookmarkedOffers = Operation.loadBookmarkedOffers();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [
        hotel1,
        hotel2
      ]);

    return loadBookmarkedOffers(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1,
            ActionCreator.changeCurrentBookmarkedOffers([createOffer(hotel1), createOffer(hotel2)])
        );
      });
  });
});

describe(`Operation addReview`, () => {
  it(`makes a correct API call to /comments/123 and dispatches correct actions`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 123;
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const review = {
      comment: `A new quiet cozy and picturesque that hides behind a a river.`,
      rating: 4,
    };
    const newComment = {
      "comment": `A new quiet cozy and picturesque that hides behind a a river.`,
      "date": `2019-05-08T14:13:56.569Z`,
      "id": 3,
      "rating": 4,
      "user": {
        "avatar_url": `img/1.png`,
        "id": 3,
        "is_pro": false,
        "name": `Ivy`
      }
    };
    const addReview = Operation.addReview(review, offerId, onSuccess, onError);

    apiMock
      .onPost(`/comments/${offerId}`, review)
      .reply(200, [
        comment1,
        comment2,
        newComment,
      ]);

    return addReview(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1,
            ActionCreator.changeCurrentOfferReviews([createReview(comment1), createReview(comment2), createReview(newComment)])
        );
        expect(dispatch).toHaveBeenNthCalledWith(2,
            ActionCreator.setReviewError(``)
        );
        expect(onSuccess).toHaveBeenCalledTimes(1);
        expect(onError).toHaveBeenCalledTimes(0);
      });
  });

  it(`makes API call to /comments/123 and when error dispatches correct actions`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 123;
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const review = {
      comment: `A new quiet cozy and picturesque that hides behind a a river.`,
      rating: 4,
    };
    const addReview = Operation.addReview(review, offerId, onSuccess, onError);

    apiMock
      .onPost(`/comments/${offerId}`, review)
      .networkError();

    return addReview(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1,
            ActionCreator.setReviewError(`Network Error`)
        );
        expect(onSuccess).toHaveBeenCalledTimes(0);
        expect(onError).toHaveBeenCalledTimes(1);
      });
  });
});

describe(`Operation changeOfferBookmarkStatus`, () => {
  it(`makes a correct API call to /favorite/123/1 and dispatches correct actions`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offer1 = Object.assign({}, createOffer(hotel1), {isBookmarked: false});
    const offer2 = Object.assign({}, createOffer(hotel2), {isBookmarked: true});
    const getState = () =>({
      [NameSpace.OFFERS]: {
        offers: [
          offer1, offer2
        ],
        currentOffersNearby: [
          offer1, offer2,
        ],
        currentBookmarkedOffers: [
          offer2,
        ]
      }
    });
    const offerId = hotel1.id;
    const bookmarkStatus = true;
    const newHotel1 = Object.assign({}, hotel1, {"is_favorite": true});

    const changeOfferBookmarkStatus = Operation.changeOfferBookmarkStatus(offerId, bookmarkStatus);

    apiMock
      .onPost(`/favorite/${offerId}/1`)
      .reply(200, newHotel1);

    return changeOfferBookmarkStatus(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1,
            ActionCreator.setAllOffers([createOffer(newHotel1), createOffer(hotel2)])
        );
        expect(dispatch).toHaveBeenNthCalledWith(2,
            ActionCreator.changeCurrentOffersNearby([createOffer(newHotel1), createOffer(hotel2)])
        );
        expect(dispatch).toHaveBeenNthCalledWith(3,
            ActionCreator.changeCurrentBookmarkedOffers([createOffer(hotel2), createOffer(newHotel1)])
        );
      });
  });
});

describe(`Reducer`, () => {
  it(`without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe(`action setReviewError`, () => {
    it(`sets new error message`, () => {
      const newError = `New error message`;
      const expectedState = Object.assign({}, initialState, {reviewError: newError});
      expect(
          reducer(undefined, ActionCreator.setReviewError(newError))
      ).toEqual(expectedState);
    });
  });

  describe(`action setAllOffers`, () => {
    it(`sets new offers`, () => {
      const newOffers = [{offerId: 1}, {offerId: 2}, {offerId: 3}];
      const newState = reducer(undefined, ActionCreator.setAllOffers(newOffers));
      const expectedState = Object.assign({}, initialState, {offers: newOffers});
      expect(newState).toEqual(expectedState);
    });

    it(`replaces offers with new offers`, () => {
      const originalState = Object.assign({}, initialState, {
        offers: [{offerId: 1}, {offerId: 2}, {offerId: 3}],
      });

      const newOffers = [{offerId: 1}];
      const expectedState = Object.assign({}, originalState, {offers: newOffers});

      expect(
          reducer(originalState, ActionCreator.setAllOffers(newOffers))
      ).toEqual(expectedState);
    });
  });

  describe(`action changeCurrentOffersReview`, () => {
    it(`sets offer reviews`, () => {
      const newReviews = [{id: 1}, {id: 2}, {id: 3}];
      const expectedState = Object.assign({}, initialState, {currentOfferReviews: newReviews});
      expect(
          reducer(undefined, ActionCreator.changeCurrentOfferReviews(newReviews))
      ).toEqual(expectedState);
    });
  });

  describe(`action changeCurrentOffersNearby`, () => {
    it(`sets offers nearby`, () => {
      const newOffersNearby = [{offerId: 1}, {offerId: 2}];
      const expectedState = Object.assign({}, initialState, {currentOffersNearby: newOffersNearby});
      expect(
          reducer(undefined, ActionCreator.changeCurrentOffersNearby(newOffersNearby))
      ).toEqual(expectedState);
    });
  });

  describe(`action changeCurrentBookmarkedOffers`, () => {
    it(`sets bookmarked offers`, () => {
      const newBookmarkedOffers = [{offerId: 1}, {offerId: 2}];
      const expectedState = Object.assign({}, initialState, {currentBookmarkedOffers: newBookmarkedOffers});
      expect(
          reducer(undefined, ActionCreator.changeCurrentBookmarkedOffers(newBookmarkedOffers))
      ).toEqual(expectedState);
    });
  });
});

import {extend} from "../../utils.js";
import {getCities} from "./selectors.js";
import {createOffer, createReview} from "../../adapters/adapters.js";
import {ActionCreator as FiltersActionCreator} from "../filters/filters.js";

const initialState = {
  offers: [],
  currentOfferReviews: [],
  currentOffersNearby: [],
};

const ActionType = {
  SET_ALL_OFFERS: `SET_ALL_OFFERS`,
  CHANGE_CURRENT_OFFER_REVIEWS: `CHANGE_CURRENT_OFFER_REVIEWS`,
  CHANGE_CURRENT_OFFERS_NEARBY: `CHANGE_CURRENT_OFFERS_NEARBY`,
};

const ActionCreator = {
  setAllOffers: (offers) => ({
    type: ActionType.SET_ALL_OFFERS,
    payload: offers,
  }),

  changeCurrentOfferReviews: (reviews) => ({
    type: ActionType.CHANGE_CURRENT_OFFER_REVIEWS,
    payload: reviews,
  }),

  changeCurrentOffersNearby: (offersNearby) => ({
    type: ActionType.CHANGE_CURRENT_OFFERS_NEARBY,
    payload: offersNearby,
  }),
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const hotels = response.data;
        const offers = hotels.map((hotel) => {
          return createOffer(hotel);
        });

        dispatch(ActionCreator.setAllOffers(offers));

        const cities = getCities(getState());
        if (cities.length) {
          const city = cities[0];
          dispatch(FiltersActionCreator.changeCity(city));
        }
      });
  },

  loadOfferReviews: (offerId) => (dispatch, getState, api) => {
    return api.get(`/comments/${offerId}`)
      .then((response) => {
        const comments = response.data;
        const reviews = comments.map((comment) => {
          return createReview(comment);
        });

        dispatch(ActionCreator.changeCurrentOfferReviews(reviews));
      });
  },

  loadOffersNearby: (offerId) => (dispatch, getState, api) => {
    return api.get(`/hotels/${offerId}/nearby`)
      .then((response) => {
        const hotelsNearby = response.data;
        const offersNearby = hotelsNearby.map((hotelNearby) => {
          return createOffer(hotelNearby);
        });

        dispatch(ActionCreator.changeCurrentOffersNearby(offersNearby));
      });
  },

  addReview: (review, offerId) => (dispatch, getState, api) => {
    return api.post(`/comments/${offerId}`, {
      comment: review.comment,
      rating: review.rating,
    })
    .then((response) => {
      const allComments = response.data;
      const reviews = allComments.map((comment) => createReview(comment));

      dispatch(ActionCreator.changeCurrentOfferReviews(reviews));
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ALL_OFFERS:
      return extend(state, {
        offers: action.payload,
      });

    case ActionType.CHANGE_CURRENT_OFFER_REVIEWS:
      return extend(state, {
        currentOfferReviews: action.payload,
      });

    case ActionType.CHANGE_CURRENT_OFFERS_NEARBY:
      return extend(state, {
        currentOffersNearby: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};

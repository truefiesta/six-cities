import {extend} from "../../utils.js";
import {getCities, getOffers, getBookmarkedOffers} from "./selectors.js";
import {createOffer, createReview} from "../../adapters/adapters.js";
import {ActionCreator as FiltersActionCreator} from "../filters/filters.js";

const initialState = {
  reviewError: ``,
  offers: [],
  currentOfferReviews: [],
  currentOffersNearby: [],
  currentBookmarkedOffers: [],
};

const ActionType = {
  SET_REVIEW_ERROR: `SET_REVIEW_ERROR`,
  SET_ALL_OFFERS: `SET_ALL_OFFERS`,
  CHANGE_CURRENT_OFFER_REVIEWS: `CHANGE_CURRENT_OFFER_REVIEWS`,
  CHANGE_CURRENT_OFFERS_NEARBY: `CHANGE_CURRENT_OFFERS_NEARBY`,
  CHANGE_CURRENT_BOOKMARKED_OFFERS: `CHANGE_CURRENT_BOOKMARKED_OFFERS`,
};

const OfferBookmarkStatus = {
  BOOKMARKED: 1,
  NOT_BOOKMARKED: 0,
};

const ActionCreator = {
  setReviewError: (err) => ({
    type: ActionType.SET_REVIEW_ERROR,
    payload: err,
  }),

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

  changeCurrentBookmarkedOffers: (bookmarkedOffers) => ({
    type: ActionType.CHANGE_CURRENT_BOOKMARKED_OFFERS,
    payload: bookmarkedOffers,
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

  loadBookmarkedOffers: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
    .then((response) => {
      const favoriteHotels = response.data;
      const bookmarkedOffers = favoriteHotels.map((hotel) => {
        return createOffer(hotel);
      });

      dispatch(ActionCreator.changeCurrentBookmarkedOffers(bookmarkedOffers));
    });
  },

  addReview: (review, offerId, onSuccess) => (dispatch, getState, api) => {
    return api.post(`/comments/${offerId}`, {
      comment: review.comment,
      rating: review.rating,
    })
    .then((response) => {
      const allComments = response.data;
      const reviews = allComments.map((comment) => createReview(comment));

      dispatch(ActionCreator.changeCurrentOfferReviews(reviews));
      dispatch(ActionCreator.setReviewError(``));
      onSuccess();
    })
    .catch((err) => {
      dispatch(ActionCreator.setReviewError(err.message));
    });
  },

  changeOfferBookmarkStatus: (offerId, bookmarkStatus) => (dispatch, getState, api) => {
    const status = bookmarkStatus ? OfferBookmarkStatus.BOOKMARKED : OfferBookmarkStatus.NOT_BOOKMARKED;

    return api.post(`/favorite/${offerId}/${status}`)
    .then((response) => {
      const offerWithChangedBookmarkStatus = createOffer(response.data);

      const offers = getOffers(getState()).slice();
      const offerIndex = offers.findIndex((offer) => {
        return offer.id === offerId;
      });

      if (offerIndex !== -1) {
        offers[offerIndex] = offerWithChangedBookmarkStatus;
      } else {
        offers.push(offerWithChangedBookmarkStatus);
      }

      dispatch(ActionCreator.setAllOffers(offers));

      let bookmarkedOffers = getBookmarkedOffers(getState()).slice();
      const bookmarkedOfferIndex = bookmarkedOffers.findIndex((offer) => {
        return offer.id === offerId;
      });

      if (bookmarkedOfferIndex !== -1) {
        bookmarkedOffers = [...bookmarkedOffers.slice(0, bookmarkedOfferIndex), ...bookmarkedOffers.slice(bookmarkedOfferIndex + 1)];
      } else {
        bookmarkedOffers.push(offerWithChangedBookmarkStatus);
      }

      dispatch(ActionCreator.changeCurrentBookmarkedOffers(bookmarkedOffers));
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_REVIEW_ERROR:
      return extend(state, {
        reviewError: action.payload,
      });

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

    case ActionType.CHANGE_CURRENT_BOOKMARKED_OFFERS:
      return extend(state, {
        currentBookmarkedOffers: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation, initialState};

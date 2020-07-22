import {createSelector} from "reselect";
import {SortTypes} from "./const.js";

export const getOffers = (state) => {
  return state.offers;
};

export const getCity = (state) => {
  return state.city;
};

export const getCurrentSortType = (state) => {
  return state.sortType;
};

export const getActiveOffer = (state) => {
  return state.activeCard;
};

export const getCurrentOfferReviews = (state) => {
  return state.currentOfferReviews;
};

export const getOffersNearby = (state) => {
  return state.currentOffersNearby;
};

export const getCityOffers = createSelector(
    getOffers,
    getCity,
    (offers, city) => offers.filter((offer) => {
      return offer.city.name === city;
    })
);

export const getSortedCityOffers = createSelector(
    [getCityOffers, getCurrentSortType],
    (cityOffers, sortType) => {
      switch (sortType) {
        case SortTypes.POPULAR:
          return cityOffers;
        case SortTypes.PRICE_HIGH_TO_LOW:
          return cityOffers.sort((offerA, offerB) => offerB.price - offerA.price);
        case SortTypes.PRICE_LOW_TO_HIGH:
          return cityOffers.sort((offerA, offerB) => offerA.price - offerB.price);
        case SortTypes.TOP_RATED_FIRST:
          return cityOffers.sort((offerA, offerB) => offerB.rating - offerA.rating);
      }

      return cityOffers;
    }
);

export const getCities = (state) => {
  const offers = getOffers(state);
  const cities = offers.map((offer) => {
    return offer.city.name;
  });

  return [...new Set(cities)];
};

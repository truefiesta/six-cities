import {createSelector} from "reselect";
import {getOffers} from "../offers/selectors.js";
import {SortType} from "../../const.js";
import {NameSpace} from "../name-space.js";

export const getCity = (state) => {
  return state[NameSpace.FILTERS].city;
};

export const getCurrentSortType = (state) => {
  return state[NameSpace.FILTERS].sortType;
};

export const getActiveOffer = (state) => {
  return state[NameSpace.FILTERS].activeCard;
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
        case SortType.POPULAR:
          return cityOffers;
        case SortType.PRICE_HIGH_TO_LOW:
          return cityOffers.sort((offerA, offerB) => offerB.price - offerA.price);
        case SortType.PRICE_LOW_TO_HIGH:
          return cityOffers.sort((offerA, offerB) => offerA.price - offerB.price);
        case SortType.TOP_RATED_FIRST:
          return cityOffers.sort((offerA, offerB) => offerB.rating - offerA.rating);
      }

      return cityOffers;
    }
);

export const getCityDetails = (state) => {
  const offers = getOffers(state);
  const city = getCity(state);
  const offerFound = offers.find((offer) => {
    return offer.city.name === city;
  });

  return offerFound ? offerFound.city : undefined;
};

import {createSelector} from "reselect";
import {SortTypes} from "./const";

export const getOffers = (state) => {
  return state.offers;
};

export const getCity = (state) => {
  return state.city;
};

export const getCurrentSortType = (state) => {
  return state.sortType;
};

export const getCityOffers = createSelector(
    getOffers,
    getCity,

    (offers, city) => offers.filter((offer) => {
      return offer.city === city;
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
    return offer.city;
  });

  return [...new Set(cities)];
};

export const getOffersNearby = (state, props) => {
  const offers = getOffers(state);
  const {offer} = props;
  const {offersNearbyIds} = offer;
  const offersNearbyIdsSet = new Set(offersNearbyIds);

  return offers.filter((offerItem) => {
    return offersNearbyIdsSet.has(offerItem.id);
  });
};

import {NameSpace} from "../name-space.js";

export const getOffers = (state) => {
  return state[NameSpace.OFFERS].offers;
};

export const getCurrentOfferReviews = (state) => {
  return state[NameSpace.OFFERS].currentOfferReviews;
};

export const getOffersNearby = (state) => {
  return state[NameSpace.OFFERS].currentOffersNearby;
};

export const getCities = (state) => {
  const offers = getOffers(state);
  const cities = offers.map((offer) => {
    return offer.city.name;
  });

  return [...new Set(cities)];
};

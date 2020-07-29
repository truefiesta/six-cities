import {NameSpace} from "../name-space.js";

export const getReviewError = (state) => {
  return state[NameSpace.OFFERS].reviewError;
};

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

export const getOffer = (state, offerId) => {
  return getOffers(state)
    .find(
        (offer) => offer.id === offerId
    );
};

export const getOffers = (state) => {
  return state.offers;
};

export const getCity = (state) => {
  return state.city;
};

export const getCityOffers = (state) => {
  const offers = getOffers(state);
  const city = getCity(state);

  return offers.filter((offer) => {
    return offer.city === city;
  });
};

export const getCities = (state) => {
  const offers = getOffers(state);
  const cities = offers.map((offer) => {
    return offer.city;
  });

  return [...new Set(cities)];
};

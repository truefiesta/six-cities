import moment from "moment";

export const convertStarRatingToWidthPercent = (rating) => {
  return Math.round(rating) * 20;
};

export const capitalize = (text) => {
  if (typeof text !== `string`) {
    return ``;
  }
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const formatDate = (date) => {
  return moment(date, `YYYY-MM-DD`).format(`MMMM D, YYYY`);
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getCityOffers = (city, allOffers) => {
  return allOffers.filter((offer) => {
    return offer.city === city;
  });
};

export const getCities = (allOffers) => {
  const cities = allOffers.reduce((accumulator, offer) => {
    accumulator[offer.city] = true;
    return accumulator;
  }, {});

  return Object.keys(cities);
};

export const EstateType = {
  APARTMENT: `apartment`,
  HOUSE: `house`,
  HOTEL: `hotel`,
  ROOM: `room`,
};

export const CityName = {
  AMSTERDAM: `Amsterdam`,
  BRUSSELS: `Brussels`,
  COLOGNE: `Cologne`,
  DUSSELDORF: `Dusseldorf`,
  HAMBURG: `Hamburg`,
  PARIS: `Paris`,
};

export const MapClass = {
  MAP_MAIN: `cities__map`,
  MAP_DETAILS: `property__map`,
};

export const OfferClassNamesForPageType = {
  main: {
    article: `cities__place-card`,
    image: `cities__image-wrapper`,
    list: `cities__places-list tabs__content`,
    info: ``,
  },
  details: {
    article: `near-places__card`,
    image: `near-places__image-wrapper`,
    list: `near-places__list`,
    info: ``,
  },
  favorites: {
    article: `favorites__card `,
    image: `favorites__image-wrapper`,
    list: ``,
    info: `favorites__card-info`,
  }
};

export const KeyCodes = {
  ENTER: 13,
  SPACEBAR: 32,
};

export const SortTypes = {
  POPULAR: 1,
  PRICE_LOW_TO_HIGH: 2,
  PRICE_HIGH_TO_LOW: 3,
  TOP_RATED_FIRST: 4,
};

export const AppRoute = {
  ROOM: `/offer/:id`,
  LOGIN: `/login`,
  FAVORITE: `/favorite`,
  ROOT: `/`,
};

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

export const CityCoordinates = {
  [CityName.AMSTERDAM]: [52.38333, 4.9],
  [CityName.PARIS]: [48.864716, 2.35],
};

export const OfferClassNamesForPageType = {
  main: {
    article: `cities__place-card`,
    image: `cities__image-wrapper`,
    list: `cities__places-list tabs__content`,
  },
  details: {
    article: `near-places__card`,
    image: `near-places__image-wrapper`,
    list: `near-places__list`,
  }
};

export const SortTypes = {
  POPULAR: `Popular`,
  PRICE_LOW_TO_HIGH: `Price: low to high`,
  PRICE_HIGH_TO_LOW: `Price: high to low`,
  TOP_RATED_FIRST: `Top rated first`,
};

export const KeyCodes = {
  ENTER: 13,
  SPACEBAR: 32,
};

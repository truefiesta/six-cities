import {extend} from "./utils.js";
import {SortTypes} from "./components/sort/sort.jsx";

const initialState = {
  city: null,
  offers: [],
  sortType: SortTypes.POPULAR,
  activeCard: null,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  SET_ALL_OFFERS: `SET_ALL_OFFERS`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  CHANGE_ACTIVE_CARD: `CHANGE_ACTIVE_CARD`,
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),

  setAllOffers: (offers) => ({
    type: ActionType.SET_ALL_OFFERS,
    payload: offers,
  }),

  changeSortType: (sortType) => ({
    type: ActionType.CHANGE_SORT_TYPE,
    payload: sortType,
  }),

  changeActiveCard: (offer) => ({
    type: ActionType.CHANGE_ACTIVE_CARD,
    payload: offer,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        city: action.payload,
      });

    case ActionType.SET_ALL_OFFERS:
      return extend(state, {
        offers: action.payload,
      });

    case ActionType.CHANGE_SORT_TYPE:
      return extend(state, {
        sortType: action.payload,
      });

    case ActionType.CHANGE_ACTIVE_CARD:
      return extend(state, {
        activeCard: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};

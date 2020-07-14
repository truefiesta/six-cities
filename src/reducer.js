import {extend} from "./utils.js";
import {SortTypes} from "./const.js";

const initialState = {
  city: null,
  offers: [],
  sortType: SortTypes.POPULAR,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  SET_ALL_OFFERS: `SET_ALL_OFFERS`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
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
  }

  return state;
};

export {reducer, ActionType, ActionCreator};

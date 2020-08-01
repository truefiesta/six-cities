import {extend} from "../../utils.js";
import {SortType} from "../../const.js";

const initialState = {
  city: ``,
  sortType: SortType.POPULAR,
  activeCard: null,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  CHANGE_ACTIVE_CARD: `CHANGE_ACTIVE_CARD`,
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
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

export {reducer, ActionType, ActionCreator, initialState};

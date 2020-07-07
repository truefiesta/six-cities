import {extend} from "./utils.js";

const initialState = {
  city: null,
  offers: [],
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  SET_ALL_OFFERS: `SET_ALL_OFFERS`,
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
  }

  return state;
};

export {reducer, ActionType, ActionCreator};

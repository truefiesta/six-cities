import {NameSpace} from "../name-space.js";
const NAME_SPACE = NameSpace.ERROR;

export const getErrorMessage = (state) => {
  return state[NAME_SPACE].errorMessage;
};

import types from "../actions/types";

export const auth = (state = null, action) => {
  switch (action.type) {
    case types.FETCH_USER:
      return action.payload.data || false;
    default:
      return state;
  }
};

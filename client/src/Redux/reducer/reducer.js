import { GET_DOGS, GET_TEMPERAMENTS } from "../actions/actions";

const initialState = {
  Dogs: [],
  Temperaments: [],
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
      };
    case GET_TEMPERAMENTS:
      const Temperaments = action.payload.map((temp) => temp.name);
      return {
        ...state,
        Temperaments,
      };

    default:
      return state;
  }
}

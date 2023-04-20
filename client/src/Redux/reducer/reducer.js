import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  FILTER_BY_TEMPERAMENT,
  FILTER_CREATE,
  ORDER_BY_NAME,
  GET_NAME_DOGS,
  POST_DOGS,
} from "../actions/actions";

const initialState = {
  Dogs: [],
  allDogs: [],
  Temperaments: [],
  filterDogs: [],
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        Dogs: action.payload,
        allDogs: action.payload,
      };

    case GET_TEMPERAMENTS:
      const temperaments = action.payload.map((temp) => temp.name);
      return {
        ...state,
        temperaments,
      };

    case GET_NAME_DOGS:
      return {
        ...state,
        Dogs: action.payload,
      };

    case FILTER_BY_TEMPERAMENT:
      const allDogs = state.allDogs;
      const filterDogs =
        action.payload === "all"
          ? allDogs
          : allDogs.filter((dog) => dog.temperament?.includes(action.payload));
      return {
        ...state,
        Dogs: filterDogs,
      };

    case POST_DOGS:
      return {
        ...state,
        Dogs: action.payload,
      };

    case FILTER_CREATE:
      const allDogsCreated = state.allDogs;
      const createdFilter =
        action.payload === "CREATED"
          ? allDogsCreated.filter((el) => el.createdInDb)
          : allDogsCreated.filter((el) => !el.createdInDb);

      return {
        ...state,
        Dogs: action.payload === "ALL" ? state.allDogsCreated : createdFilter,
      };

    case ORDER_BY_NAME:
      const orderName =
        action.payload === "ASC"
          ? state.Dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.Dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        Dogs: orderName,
      };

    default:
      return state;
  }
}

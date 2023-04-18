import axios from "axios";
export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";

export function getAllDogs() {
  return async function (dispatch) {
    var allDogs = await axios.get("http://localhost:3001/dogs");

    return dispatch({
      type: GET_DOGS,
      payload: allDogs.data,
    });
  };
}

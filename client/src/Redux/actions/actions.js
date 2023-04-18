import { GET_DOGS } from "../actionTypes/actionTypes";

import axios from "axios";

export function getDogs() {
  return async function (dispatch) {
    var allDogs = await axios.get("http://localhost3001/dogs");

    return dispatch({
      type: GET_DOGS,
      Payload: allDogs.data,
    });
  };
}

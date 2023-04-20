import axios from "axios";
export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
export const FILTER_CREATE = "FILTER_CREATE";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_NAME_DOGS = "GET_NAME_DOGS";
export const POST_DOGS = "POST_DOGS";

//*TRAER LOS PERROS
export function getAllDogs() {
  return async function (dispatch) {
    var allDogs = await axios.get("http://localhost:3001/dogs");

    return dispatch({
      type: GET_DOGS,
      payload: allDogs.data,
    });
  };
}

//*TRAER LOS TEMPS
export function getAllTemperaments() {
  return async function (dispatch) {
    try {
      var allTemperaments = await axios.get(
        "http://localhost:3001/temperaments"
      );
      return dispatch({
        type: GET_TEMPERAMENTS,
        payload: allTemperaments.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

//*CREAR DOGS
export function postDogs(payload) {
  return async function (dispatch) {
    try {
      var response = await axios.post("http://localhost:3001/dogs", payload);

      return response({});
    } catch (err) {
      console.error(err);
    }
  };
}
//*PARA LA SEARCH
export function getNameDogs(name) {
  return async function (dispatch) {
    try {
      var response = await axios.get(`http://localhost:3001/dogs?name=${name}`);
      return dispatch({
        type: GET_NAME_DOGS,
        payload: response.data,
      });
    } catch (err) {
      console.error(`Dog not found, try another name`);
      alert(`Dog not found, try another name`);
    }
  };
}

//* FILTRAR LOS TEMP
export function filterByTemperaments(payload) {
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload,
  };
}

//* FILTRAR LOS DOGS CREADOS BDD
export function filterCreated(payload) {
  return {
    type: FILTER_CREATE,
    payload,
  };
}

//*ORDENAR ASC , DES
export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

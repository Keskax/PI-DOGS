const axios = require("axios");
require("dotenv").config();
const { API_KEY, URL } = process.env;

//!info API
const getApiInfo = async () => {
  const apiUrl = await axios.get(`${URL}?api_key=${API_KEY}`);

  const apiInfo = await apiUrl.data.map((obj) => {
    return {
      id: obj.id,
      name: obj.name,
      weight: obj.weight,
      weight_min: obj.weight_min,
      weight_max: obj.weight_max,
      height: obj.height,
      height_min: obj.height_min,
      height_max: obj.height_max,
      life_span: obj.life_span,
      life_span_min: obj.life_span_min,
      life_span_max: obj.life_span_max,
      temperament: [obj.temperament].map((obj) => obj),
      img: obj.image.url,
    };
  });

  return apiInfo;
};

module.exports = getApiInfo;

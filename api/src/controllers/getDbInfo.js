const { Dog, Temperaments } = require("../db");

//! Info BDD
const getDbInfo = async () => {
  return await Temperaments.findAll({
    include: {
      model: Dog,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

module.exports = getDbInfo;

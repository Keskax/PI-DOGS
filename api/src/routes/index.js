const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
require("dotenv").config();

const { API_KEY, URL } = process.env;
const { Dog, Temperaments } = require("../db");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//!info API
const getApiInfo = async () => {
  const apiUrl = await axios.get(`${URL}?api_key=${API_KEY}`);

  const apiInfo = await apiUrl.data.map((obj) => {
    return {
      id: obj.id,
      name: obj.name,
      height: obj.height.metric,
      weight: obj.weight.metric,
      life_span: obj.life_span,
      life_span_min: obj.life_span_min,
      life_span_max: obj.life_span_max,
      temperament: [obj.temperament].map((obj) => obj),
      img: obj.image.url,
    };
  });

  return apiInfo;
};

//! Info BDD
const getDbInfo = async () => {
  return await Dog.findAll({
    attributes: ["id", "name", "height", "weight", "life_span", "image"],
    include: {
      model: Temperaments,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};
//!Concatenar las dos info

const getAllDogs = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

//!Creación de Rutas .get/dogs

router.get("/dogs", async (req, res) => {
  const name = req.query.name;
  let allDogs = await getAllDogs();

  if (name) {
    let dogName = await allDogs.filter((dg) =>
      dg.name.toLowerCase().includes(name.toLowerCase())
    );

    dogName.length
      ? res.status(200).send(dogName)
      : res.status(404).send("No existe el perro con ese nombre");
  } else {
    res.status(200).send(allDogs);
  }
});

//!Creación de ruta .get/id

router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const allDogs = await getAllDogs();

  if (id) {
    const DogId = allDogs.filter((dog) => dog.id == id);
    DogId.length
      ? res.status(200).json(DogId)
      : res.status(404).send("El id no se encontró");
  }
});

//!Creación de ruta .get/temperaments

router.get("/temperaments", async (req, res) => {
  const temperamentsApi = await axios.get(`${URL}?api_key=${API_KEY}`);
  const temperaments = temperamentsApi.data.map((temp) => temp.temperament);
  const temps = temperaments.toString().split(",");
  temps.forEach((nameDog) => {
    let newName = nameDog;
    Temperaments.findOrCreate({
      where: { name: newName },
    });
  });

  const allTemp = await Temperaments.findAll();
  res.send(allTemp);

  // const temperamentsApi = await axios.get(`${URL}?api_key=${API_KEY}`);
  // const temperaments = temperamentsApi.data.map((temp) => temp.temperament);
  // const tempEach = temperaments.map((temp) => {
  //   for (let i = 0; i < temp.length; i++) return temp[i];

  //   tempEach.forEach((temp) => {
  //     Temperaments.findOrCreate({
  //       where: { name: temp },
  //     });
  //   });

  //   const allTemperaments = Temperaments.findAll();
  //   res.send(allTemperaments);
  // });
});

router.post("/dogs", async (req, res) => {
  try {
    const {
      name,
      weight_min,
      weight_max,
      height_min,
      height_max,
      life_span_min,
      life_span_max,
      img,
      temperament,
    } = req.body;

    // Busca los temperamentos en la base de datos y los guarda en un array
    const temperamentsDB = await Temperaments.findAll({
      where: { name: temperament },
    });

    // Crea el objeto del nuevo perro con los datos recibidos
    const newDog = {
      name,
      height: `${height_min} - ${height_max}`,
      weight: `${weight_min} - ${weight_max}`,
      life_span: `${life_span_min} - ${life_span_max}`,
      image: img,
    };

    // Crea el perro en la base de datos y le asigna los temperamentos
    const createdDog = await Dog.create(newDog);
    await createdDog.addTemperaments(temperamentsDB);

    res.status(201).json(createdDog);
  } catch (err) {
    console.log("ERROR", err);
    res.status(404).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

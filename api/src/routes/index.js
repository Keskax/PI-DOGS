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

//!Creación de Rutas .get/dogs

router.get("/dogs", async (req, res) => {
  const name = req.query.name;
  let allDogs = await allDogs();

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
  const allDogs = await allDogs();

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
  let {
    id,
    name,
    weight_min,
    weight_max,
    height_min,
    height_max,
    life_span_min,
    life_span_max,
    temperament,
    img,
  } = req.body;

  let DogCreate = await Dog.create({
    id,
    name,
    weight_min,
    weight_max,

    height_min,
    height_max,

    life_span_min,
    life_span_max,
    temperament,
    img,
  });

  let temperamentDB = await Temperaments.findAll({
    where: { name: temperament },
  });

  DogCreate.addTemperament(temperamentDB);

  return res.status(201).send("Se ha creado con éxito");
});

module.exports = router;
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllDogs,
  getAllTemperaments,
  filterByTemperaments,
  filterCreated,
  orderByName,
} from "../../Redux/actions/actions";
import Paginado from "../Paginado/Paginado";
import style from "./home.module.css";
import Dog from "../Dog/Dog";
import SearchBar from "../SearchBar/SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.Dogs);

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);

  const numberOfLastDogs = currentPage * dogsPerPage;
  const numberOfFirstDogs = numberOfLastDogs - dogsPerPage;

  const currentDogs = allDogs.slice(numberOfFirstDogs, numberOfLastDogs);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //*PAGINADO
  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getAllTemperaments());
  }, [dispatch]);
  //*PAGINADO

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getAllDogs());
  };

  //*TEMPS
  const temperaments = useSelector((state) => state.Temperaments);
  const [temperament, setTemperaments] = useState("all");

  //*HAY QUE MODIFICAR, NO ESTÁ MOSTRANDO LOS TEMPS
  const handleFilterTemp = (event) => {
    event.preventDefault();
    dispatch(filterByTemperaments(event.target.value));
    setCurrentPage(1);
    setTemperaments(event.target.value);
  };

  //*FILTRAR POR ASC,DES
  const handleFilterCreated = (event) => {
    dispatch(filterCreated(event.target.value));
  };

  const [order, setOrder] = useState("");

  const handleOrderByName = (event) => {
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setOrder(event.target.value);
  };

  return (
    <div>
      <Link to="/Dogs">Crear Perro</Link>
      <h1>API DOGS</h1>
      <button onClick={handleClick}>Recargar</button>

      <SearchBar />
      <div>
        <select onChange={(event) => handleOrderByName(event)}>
          <option value="ASC">Ascendente</option>
          <option value="DES">Descendente</option>
        </select>

        <span> Filter by temperament </span>
        <select
          value={temperament}
          onChange={(event) => handleFilterTemp(event)}
        >
          <option value="all"> All </option>
          {temperaments.map((temp, index) => (
            <option onClick={(e) => handleClick(e)} key={index}>
              {temp.name}
            </option>
          ))}
        </select>

        <span> Sort by weight </span>
        <select onChange={(event) => handleFilterCreated(event)}>
          <option value="All">Todos</option>
          <option value="CREATED">Creados</option>
          <option value="API">API</option>
        </select>

        <div className={style.container}>
          {currentDogs?.map((dg) => {
            return (
              <Link to={"/home" + dg.id}>
                <Dog
                  name={dg.name}
                  id={dg.id}
                  img={dg.img}
                  weightMin={dg.weightMin}
                  weightMax={dg.weightMax}
                  temperament={dg.temperament}
                  temperaments={dg.temperaments?.map((t) => t.name).join(", ")}
                />
              </Link>
            );
          })}
        </div>
      </div>
      <Paginado
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paginado={paginado}
      />
    </div>
  );
}

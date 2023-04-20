import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs } from "../../Redux/actions/actions";
import { Link } from "react-router-dom";
import style from "./home.module.css";
import Dog from "../Dog/Dog";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);

  const numberOfLastDogs = currentPage * dogsPerPage;
  const numberOfFirstDogs = numberOfLastDogs - dogsPerPage;

  const currentDogs = allDogs.slice(numberOfFirstDogs, numberOfLastDogs);

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  function handleClick(event) {
    event.preventDefault();
    dispatch(getAllDogs());
  }

  return (
    <div>
      <Link to="/Dogs">Crear Perro</Link>
      <h1>API DOGS</h1>
      <button
        onClick={(event) => {
          handleClick(event);
        }}
      ></button>

      <div>
        <select>
          <option value="ASCENDENTE">Ascendente</option>
          <option value="DESCENDENTE">Descendente</option>
        </select>
        <select>
          <option value="All">All</option>
          <option value="ACT">Active</option>
          <option value="ADV">Adventurous</option>
          <option value="HAP">Happy</option>
        </select>
        <select>
          <option value="All">All</option>
          <option value="CREATED">Created</option>
          <option value="API">Api</option>
        </select>
        {allDogs?.map((dg) => {
          return (
            <div className={style.container}>
              <Link to={"</home"} className={style.card}>
                <Dog
                  name={dg.name}
                  id={dg.id}
                  img={dg.img}
                  weightMin={dg.weightMin}
                  weightMax={dg.weightMax}
                  temperament={dg.temperament}
                  temperaments={dg.temperaments}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

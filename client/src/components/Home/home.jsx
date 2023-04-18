import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../Redux/actions/actions";
import { Link } from "react-router-dom";
import Dog from "../Dog/Dog";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  function handleClick(event) {
    event.preventDefault();
    dispatch(getDogs());
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
        {allDogs &&
          allDogs.map((dg) => {
            return (
              <Link to={"/home"}>
                <Dog
                  name={dg.name}
                  id={dg.id}
                  image={dg.image}
                  temperament={dg.temperament}
                  temperaments={dg.temperaments}
                  weightMin={dg.weightMin}
                  weightMax={dg.weightMax}
                />
              </Link>
            );
          })}
      </div>
    </div>
  );
}

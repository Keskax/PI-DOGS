import React from "react";
import { Link } from "react-router-dom";
import style from "./Dog.module.css";

export default function Dog({
  id,
  name,
  img,
  temperament,
  temperaments,
  weight,
  weight_min,
  weight_max,
}) {
  return (
    <div className={style.card}>
      <Link to={`/${id}`}>
        <img className={style.imagen} src={img} alt="" />
        <h4 className={style.name}>{name}</h4>
        <div className={style.contenido}>
          <div>
            <h5>
              <u>Weight</u>: {weight_min} - {weight_max} kg.
            </h5>
            <p className={style}>{temperaments ? temperaments : temperament}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

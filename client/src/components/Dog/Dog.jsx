import React from "react";
import { Link } from "react-router-dom";
import style from "./Dog.module.css";

export default function Dog({
  id,
  name,
  img,
  temperament,
  temperaments,
  weightMin,
  weightMax,
}) {
  return (
    <div className={style.card}>
      <Link to={`/${id}`}>
        <img className={style.imagen} src={img} alt="" />
        <h4 className={style.name}>{name}</h4>
        <div className={style.contenido}>
          <div>
            <h4 className={style.cardSub}>
              Weight: {weightMin} - {weightMax} Kg
            </h4>
          </div>
          <div className={style.temp}>
            <h5>
              <p className={style.tempWrapper}>
                {temperaments ? temperaments : temperament}
              </p>
            </h5>
          </div>
        </div>
      </Link>
    </div>
  );
}

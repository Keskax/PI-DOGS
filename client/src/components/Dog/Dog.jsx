import React from "react";
import { Link } from "react-router-dom";
import style from "./Dog.module.css";

export default function Dog({
  id,
  name,
  image,
  temperament,
  temperaments,
  weightMin,
  weightMax,
}) {
  return (
    <div className={style.container}>
      <Link to={`/dogs/${id}`} style={{ textDecoration: "none" }}>
        <div className={style.wrapperImg}>
          <img className={style.imgDog} src={image} alt={name} />
        </div>
        <div className={style.cardText}>
          <h2 className={style.cardTitle}>{name}</h2>

          <h4 className={style.cardSub}>
            weight: {weightMin} - {weightMax} Kg
          </h4>
          <div>
            <p className={style.tempWrapper}>
              {temperaments ? temperaments : temperament}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

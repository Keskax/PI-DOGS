import React from "react";
import style from "./Paginado.module.css";

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav>
      <ul className={style.paginado}>
        {pageNumber &&
          pageNumber.map((number) => (
            <a onClick={() => paginado(number)}>{number}</a>
          ))}
      </ul>
    </nav>
  );
}

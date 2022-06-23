import React from "react";
import s from "./Paginated.module.css";

export default function Paginated({ paginated, recipesPerPage, allRecipes }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className={s.paginado}>
        {pageNumbers.map((number) => (
          <div key={number}>
            <button className={s.number} onClick={() => paginated(number)}>
              {number}
            </button>
          </div>
        ))}
      </div>
    </nav>
  );
}
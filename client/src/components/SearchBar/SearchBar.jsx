import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getNameDogs } from "../../Redux/actions/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getNameDogs(name));
  };

  return (
    <div>
      <input
        onChange={(event) => handleInputChange(event)}
        type="text"
        placeholder="Search"
      />
      <button type="submit" onClick={(event) => handleSubmit(event)}>
        Search
      </button>
    </div>
  );
}

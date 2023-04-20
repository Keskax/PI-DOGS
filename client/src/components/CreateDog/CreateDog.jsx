import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAllTemperaments } from "../../Redux/actions/actions";

export default function CreateDogs() {
  const dispatch = useDispatch();

  const temperaments = useSelector((state) => state.temperaments);

  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_span_Min: "",
    life_span_Max: "",
    temperaments: [],
    image: "",
  });

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>CREATE DOG</h1>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" value={input.name} name="name" />
        </div>

        <div>
          <label>Height Min:</label>
          <input type="text" value={input.height} />
        </div>

        <div>
          <label>Height Max:</label>
          <input type="text" value={input.height} />
        </div>

        <div>
          <label>Weight Min:</label>
          <input type="text" value={input.weight} />
        </div>

        <div>
          <label>Weight Max:</label>
          <input type="text" value={input.weight} />
        </div>

        <div>
          <label>Life Span Min:</label>
          <input type="text" value={input.life_span} />
        </div>

        <div>
          <label>Life Span Max:</label>
          <input type="text" value={input.life_span} />
        </div>

        <div>
          <label>Image:</label>
          <input type="text" value={input.image} />
        </div>
        <select>
          {temperaments.map((temp) => (
            <option value={temp.name}>{temp.name}</option>
          ))}
        </select>
      </form>
    </div>
  );
}

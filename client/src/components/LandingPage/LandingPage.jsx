import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <div>
        <h4>
          <span>P</span>
          <span>I</span>
          <span>-</span>
          <span>D</span>
          <span>O</span>
          <span>G</span>
          <span>S</span>
          <span>!</span>
        </h4>
        <Link to="/home">
          <button>ENTER</button>
        </Link>
      </div>
    </div>
  );
}

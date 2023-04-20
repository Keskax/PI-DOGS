import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/home";
import CreateDogs from "./components/CreateDog/CreateDog";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dogs" element={<CreateDogs />} />
        {/* <Route path="/home/:id" element={<Detail />} /> */}
      </Routes>
    </div>
  );
}

export default App;

import React, { useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { Link, Routes, Route } from "react-router-dom";
import SingleMovie from "./singleMovie";
import SingleCast from "./SingleCast";
import DegreesOfSeparation from "./DegreesOfSeparation";

const App = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/movie/49026">SingleMovie</Link>
        <Link to="/casts/85">SingleCast</Link>
      </nav>
      <h1>Reel Relations</h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<SingleMovie />} />
        <Route path="/casts/:id" element={<SingleCast />} />
        <Route
          path="/degrees-of-separation/:actor1Id/:actor2Id"
          element={<DegreesOfSeparation />}
        />
      </Routes>
    </div>
  );
};

export default App;

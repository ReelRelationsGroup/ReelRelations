import React, { useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { Link, Routes, Route } from "react-router-dom";
import { Film, Clapperboard, Video } from "lucide-react";
import SingleMovie from "./singleMovie";
import SingleCast from "./SingleCast";
import DegreesOfSeparation from "./DegreesOfSeparation";

const App = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/movie/10196">SingleMovie</Link>
        <Link to="/casts/85">SingleCast</Link>
      </nav>
      <h1>
        <Clapperboard />
        Reel Relations
        <Video /> <Film />
      </h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<SingleMovie />} />
        <Route path="/casts/:id" element={<SingleCast />} />
        <Route
          path="/degrees-of-separation/:casts1Id/:casts2Id"
          element={<DegreesOfSeparation />}
        />
      </Routes>
    </div>
  );
};

export default App;

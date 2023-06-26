import React, { useEffect } from "react";
import Home from "./Home";
import LoginRegister from "./LoginRegister";
import { useSelector, useDispatch } from "react-redux";
import { Link, Routes, Route } from "react-router-dom";
import { Film, Clapperboard, Video } from "lucide-react";
import SingleMovie from "./singleMovie";
import SingleCast from "./SingleCast";
import DegreesOfSeparation from "./DegreesOfSeparation";
import Navbar from "./Navbar";
import About from "./About";

const App = () => {
  return (
    <div>
      <Navbar />
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
        <Route path='/about' element={<About /> } /> 
        <Route path='/login' element={<LoginRegister />} />
      </Routes>
    </div>
  );
};

export default App;

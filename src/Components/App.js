import React, { useEffect } from "react";
import Home from "./Home";
import LoginRegister from "./LoginRegister";
import { useSelector, useDispatch } from "react-redux";
import { Link, Routes, Route } from "react-router-dom";
import { Film, Clapperboard, Video } from "lucide-react";
import SingleMovie from "./SingleMovie";
import SingleCast from "./SingleCast";
import DegreesOfSeparation from "./DegreesOfSeparation";
import Navbar from "./Navbar";
import About from "./About";
import { PageNotFound } from "./PageNotFound";
import Favorites from "./Favorites";

const App = () => {
  return (
    <div>
      <Navbar />
      <h1>
        <Clapperboard />
        <div className="ml-8"> Reel Relations </div>
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
        <Route path="/about" element={<About />} />
        <Route path="/favorites" element={<Favorites />} /> 
        <Route path="/login" element={<LoginRegister />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;

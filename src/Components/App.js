import React, { useEffect, useState } from "react";
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
import Spinner from "./Spinner";
import Favorites from "./Favorites";
import Footer from "./Footer";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // initial data loading here
    // when loaded then set loading to false
    setLoading(false);
  }, []);

  return (
    <div>
      <div>
        <Navbar />
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
      <Footer />
    </div>
  );
};

export default App;

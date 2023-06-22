import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../store";
import { SearchIcon, Star } from "lucide-react";

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  // state to keep track of the casts' (actors') names
  const [casts1, setCasts1] = useState("");
  const [casts2, setCasts2] = useState("");
  const [degreesOfSeparation, setDegreesOfSeparation] = useState(null);

  // func to handle the API call
  const findLink = async () => {
    try {
      const res = await axios.get(
        `/api/degrees-of-separation?casts1=${casts1}&casts2=${casts2}`
      );
      setDegreesOfSeparation(res.data.degreesOfSeparation);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <div>
        <Star />
        Welcome {auth.username} to Reel Relations!!
        <Star />
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>

      {/* input fields for casts' (actor) names */}
      <div className="join">
        <div className="btn btn-square join-item" disabled>
          <SearchIcon size={24} className="text-black" />
        </div>
        <input
          type="text"
          value={casts1}
          onChange={(e) => setCasts1(e.target.value)}
          placeholder="Enter 1st Actor"
          className="xl:btn-xl btn-ghost join-item btn flex items-center border-2 border-secondary bg-base-300 text-2xl font-bold normal-case hover:bg-base-200"
        />
        <div className="btn btn-square join-item" disabled>
          <SearchIcon size={24} className="text-black" />
        </div>
        <input
          type="text"
          value={casts2}
          onChange={(e) => setCasts2(e.target.value)}
          placeholder="Enter 2nd Actor"
          className="xl:btn-xl btn-ghost join-item btn flex items-center border-2 border-secondary bg-base-300 text-2xl font-bold normal-case hover:bg-base-200"
        />
        <button onClick={findLink}>Find Link</button>
      </div>

      {/* displays the degrees of separation */}
      {degreesOfSeparation !== null && (
        <div>Degrees of Separation: {degreesOfSeparation}</div>
      )}
    </div>
  );
};

export default Home;

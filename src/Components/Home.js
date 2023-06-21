import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../store";
import { SearchIcon } from "lucide-react";

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  // state to keep track of the actors' names
  const [actor1, setActor1] = useState("");
  const [actor2, setActor2] = useState("");
  const [degreesOfSeparation, setDegreesOfSeparation] = useState(null);

  // func to handle the API call
  const findLink = async () => {
    try {
      const res = await axios.get(
        `/api/degrees-of-separation?actor1=${actor1}&actor2=${actor2}`
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
        Welcome {auth.username} to Reel Relations!!
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>

      {/* input fields for actor names */}
      <div className="join">
        <div className="btn btn-square join-item" disabled>
          <SearchIcon size={24} className="text-black" />
        </div>
        <input
          type="text"
          value={actor1}
          onChange={(e) => setActor1(e.target.value)}
          placeholder="Enter 1st actor"
          className="xl:btn-xl btn-ghost join-item btn flex items-center border-2 border-secondary bg-base-300 text-2xl font-bold normal-case hover:bg-base-200"
        />
        <div className="btn btn-square join-item" disabled>
          <SearchIcon size={24} className="text-black" />
        </div>
        <input
          type="text"
          value={actor2}
          onChange={(e) => setActor2(e.target.value)}
          placeholder="Enter 2nd actor"
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

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { logout, fetchSomeActors, fetchActors } from "../store";
import { SearchIcon, Star } from "lucide-react";
import { fetchDegreesOfSeparation } from "../utils/api";

const Home = () => {
  const dispatch = useDispatch();
  const { auth, someActors } = useSelector((state) => state);

  // state to keep track of the casts' (actors') names
  const [casts1Id, setCasts1Id] = useState("");
  const [casts2Id, setCasts2Id] = useState("");
  const [degreesOfSeparation, setDegreesOfSeparation] = useState(null);
  const [path, setPath] = useState([])
  const [moviesPath, setMoviesPath] = useState(null)

  useEffect(() => {
    for (let i=0;i<path.length;i++) {
      dispatch(fetchSomeActors(path[i]));
    }
  }, [path]);

  // func to handle the API call
  const findLink = async () => {
    try {
      const response = await fetchDegreesOfSeparation(casts1Id, casts2Id);
      setDegreesOfSeparation(response.degreesOfSeparation);
      setPath(response.path)
      setMoviesPath(response.moviesPath)
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
          value={casts1Id}
          onChange={(e) => setCasts1Id(e.target.value)}
          placeholder="Enter 1st Actor"
          className="xl:btn-xl btn-ghost join-item btn flex items-center border-2 border-secondary bg-base-300 text-2xl font-bold normal-case hover:bg-base-200"
        />
        <div className="btn btn-square join-item" disabled>
          <SearchIcon size={24} className="text-black" />
        </div>
        <input
          type="text"
          value={casts2Id}
          onChange={(e) => setCasts2Id(e.target.value)}
          placeholder="Enter 2nd Actor"
          className="xl:btn-xl btn-ghost join-item btn flex items-center border-2 border-secondary bg-base-300 text-2xl font-bold normal-case hover:bg-base-200"
        />
        <button onClick={findLink}>Find Link</button>
      </div>

      {/* displays the degrees of separation */}
      {degreesOfSeparation !== null && (
        <div>Degrees of Separation: {degreesOfSeparation}</div>
      )}
      {path.map(actorId => (
          <div>
            <Link
              to={`/casts/${actorId}`}
            >
              {actorId}
            </Link>
          </div>
        ))
      }
    </div>
  );
};

export default Home;

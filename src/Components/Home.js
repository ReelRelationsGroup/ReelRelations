import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SearchIcon, Star } from "lucide-react";
import { fetchDegreesOfSeparation } from "../utils/api";

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  // state to keep track of the casts' (actors') names
  const [casts1Id, setCasts1Id] = useState("");
  const [casts2Id, setCasts2Id] = useState("");
  const [degreesOfSeparation, setDegreesOfSeparation] = useState(null);
  const [path, setPath] = useState(null);

  // Helper function to capitalize the first letter of every word
  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Function to handle the API call
  const findLink = async () => {
    try {
      const response = await fetchDegreesOfSeparation(casts1Id, casts2Id);
      setDegreesOfSeparation(response.degreesOfSeparation);
      setPath(response.path);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex">
        <Star />
        <div className="ml-3 mr-3 mb-4">Welcome {auth.username} to Reel Relations!! </div>
        <Star />
      </div>

      {/* Input fields for casts' (actors') names */}
      <div className="flex flex-wrap justify-center join">
        <div className="btn btn-square join-item" disabled>
          <SearchIcon size={24} className="text-black" />
        </div>
        <input
          type="text"
          value={casts1Id}
          onChange={(e) => setCasts1Id(capitalizeFirstLetter(e.target.value))}
          placeholder="Enter 1st Actor"
          className="xl:btn-xl btn-ghost join-item btn flex items-center border-2 border-secondary bg-base-300 text-2xl font-bold normal-case hover:bg-base-200"
        />
        <div className="btn btn-square join-item" disabled>
          <SearchIcon size={24} className="text-black" />
        </div>
        <input
          type="text"
          value={casts2Id}
          onChange={(e) => setCasts2Id(capitalizeFirstLetter(e.target.value))}
          placeholder="Enter 2nd Actor"
          className="xl:btn-xl btn-ghost join-item btn flex items-center border-2 border-secondary bg-base-300 text-2xl font-bold normal-case hover:bg-base-200"
        />
        <button
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          onClick={findLink}
        >
          Find Link
        </button>
      </div>

      {/* Displays the degrees of separation */}
      {degreesOfSeparation !== null && (
        <div>Degrees of Separation: {degreesOfSeparation}</div>
      )}
      {path !== null && <div>Path Array: {path}</div>}
    </div>
  );
};

export default Home;

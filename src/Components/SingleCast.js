import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { fetchActorById, fetchActors } from "../store";
import Carousel from "./Carousel";
import Spinner from "./Spinner";

const SingleCast = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singleActor, actors } = useSelector((state) => state);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 15;

  useEffect(() => {
    dispatch(fetchActorById(id));
    dispatch(fetchActors());
  }, [dispatch, id]);

  if (!singleActor || !singleActor.movie_credits) {
    return (
      <>
        <Spinner />{" "}
        {/* Display the Spinner component when the data is loading */}
        <h1 className="flex flex-wrap justify-center text-2xL">
          <div className="flex justify-center items-center">
            <img
              className="max-w-sm"
              src="https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif"
              alt="Loading..."
            />
          </div>
          You're Lost Buddy - Actor Page Not Found
        </h1>
        <NavLink
          className="flex flex-wrap justify-center inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          to={"/"}
        >
          Return Back Home
        </NavLink>
      </>
    );
  }

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = singleActor.movie_credits.cast.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2">
        <h1>{singleActor.name}</h1>
        <h1>ACTORS: {actors.length}</h1>
        <img
          className="w-52 h-75"
          src={`https://image.tmdb.org/t/p/original${singleActor.profile_path}`}
          alt="Actor Profile"
        />
        <h3>Born on {singleActor.birthday}</h3>
        <p>{singleActor.biography}</p>
      </div>
      <div className="w-full md:w-1/2">
        <Carousel movies={singleActor.movie_credits.cast} />
        <ul>
          {currentMovies.map((movie) => (
            <li key={movie.id}>
              {movie.title} {movie.popularity}
            </li>
          ))}
        </ul>
        <div>
          {singleActor.movie_credits.cast.length > moviesPerPage && (
            <ul>
              {Array.from(
                Array(
                  Math.ceil(
                    singleActor.movie_credits.cast.length / moviesPerPage
                  )
                ),
                (value, index) => (
                  <li key={index}>
                    <button
                      className={`pagination-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCast;

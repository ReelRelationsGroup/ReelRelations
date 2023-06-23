import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchActorById } from "../store";
import Carousel from "./Carousel";

const SingleCast = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singleActor } = useSelector((state) => state);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 15;

  useEffect(() => {
    dispatch(fetchActorById(id));
  }, [dispatch, id]);

  if (!singleActor || !singleActor.movie_credits) {
    return <div>Loading...</div>;
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
        <img
          className="w-52 h-75"
          src={`https://image.tmdb.org/t/p/original${singleActor.profile_path}`}
          alt="Actor Profile"
        />
        <h3>Born on {singleActor.birthday}</h3>
        <p>{singleActor.biography}</p>
      </div>
      <div className="w-full md:w-1/2">
        <Carousel movies={currentMovies} />
        <ul>
          {currentMovies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
        <div >
          {singleActor.movie_credits.cast.length > moviesPerPage && (
            <ul>
              {Array.from(
                Array(
                  Math.ceil(singleActor.movie_credits.cast.length / moviesPerPage)
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

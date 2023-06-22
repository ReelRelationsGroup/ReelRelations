import React from "react";


const Carousel = ({movies}) => {

    const filteredMovies = movies.filter(movie => movie.popularity > 0);
    const sortedPopularity = filteredMovies.sort((movie1, movie2) => movie2.popularity - movie1.popularity).slice(0,10);

    return (
        <div className="max-w-[1400px] h-[780] w-full m-auto py-16 px-4 relative">
            <div
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${sortedPopularity[1].poster_path})`,
                }}
                className="rounded-2xl bg-center bg-cover duration-500"
            >
            </div>
        </div>
    )

    
}

export default Carousel
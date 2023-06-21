import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const SingleMovie = () => {
    const { id } = useParams();

    return (
        <div>
            <h1>SingleMovie</h1>

            <p>Single Movie ID: {id}</p>
        </div>
    )
}

export default SingleMovie;
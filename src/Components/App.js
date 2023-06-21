import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchCart } from '../store';
import { Link, Routes, Route } from 'react-router-dom';
import SingleMovie from './singleMovie';
import SingleCast from './SingleCast';

const App = ()=> {

  return (

    <div>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/movie/49026'>SingleMovie</Link>
        <Link to='/cast/85'>SingleCast</Link>
      </nav>
      <h1>Reel Relations</h1>

      <Routes>
        <Route path="/movie/:id" element={<SingleMovie />} />
        <Route path="/cast/:id" element={<SingleCast />} />

      </Routes>
    </div>
  )

};

export default App;

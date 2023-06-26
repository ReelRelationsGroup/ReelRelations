import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Search = () => {
  const navigate = useNavigate();
  const { term } = useParams();

  const search = (ev) => {
    if(ev.target.value.trim()) {
      navigate(`/search/${ev.target.value}`)
    } else {
      navigate('/');
    }
  };

  

  return (
    <div>
        <form autocomplete="off
        " action={ search }>
            <div class="autocomplete" style="width:300px;">
                <input value={ term }/>
             </div>
                <input type="submit"/>
        </form>
    </div>
    
  )
  
}

export default Search
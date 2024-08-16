import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './favorites.module.css';


function Favorites() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const myList = localStorage.getItem('@primeflix');
        setMovies(JSON.parse(myList) || []);

    }, [])
  return (
    <div className={style.myMovies}>
      <h1>Favorites</h1>
      <ul>
        {movies.map((item) => {
            return (
                <li key={item.id}>
                    <span>{item.title}</span>
                    <div>
                        <Link to={`/movie/${item.id}`}>Details</Link>
                        <button>Excluir</button>
                    </div>
                </li>
            )
        })}
      </ul>
    </div>
  )
}

export default Favorites

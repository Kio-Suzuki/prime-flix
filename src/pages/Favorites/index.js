import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './favorites.module.css';


function Favorites() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const myList = localStorage.getItem('@primeflix');
        setMovies(JSON.parse(myList) || []);

    }, [])

    function removeMovie(id) {
        let removed = movies.filter((movie) => {
            return (movie.id !== id)
        })
        setMovies(removed);
        localStorage.setItem('@primeflix', JSON.stringify(removed))
    }
  return (
    <div className={style.myMovies}>
      <h1>Favorites Movies</h1>

      {movies.length === 0 && <span>Empty</span>}
      <ul>
        {movies.map((item) => {
            return (
                <li key={item.id}>
                    <span>{item.title}</span>
                    <div>
                        <Link to={`/movie/${item.id}`}>Details</Link>
                        <button onClick={() => removeMovie(item.id)}>Excluir</button>
                    </div>
                </li>
            )
        })}
      </ul>
    </div>
  )
}

export default Favorites

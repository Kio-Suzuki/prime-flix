import React, { useEffect, useState } from 'react'
import api from '../../services/api';
import styles from './home.module.css'
import { Link } from 'react-router-dom';
//URL DA API: movie/now_playing?api_key=dfa4fc8f554de20cd7318a5f3ae7a20c&language=pr-BR

function Home() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    async function loadMovies(){
      const response = await api.get('movie/now_playing', {
        params:{
          api_key: 'dfa4fc8f554de20cd7318a5f3ae7a20c',
          language: 'pt-BR',
          page: 1
        }
      })
      
      setMovies(response.data.results);
      setLoading(false);
    }
    loadMovies();
  }, [])

  if(loading) {
    return (
      <div className={styles.loading}>
        <h2>Loading movies...</h2>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.movieList}>
        {movies.map((movie) => {
          return (
            <article key={movie.id}>
              <strong>{movie.title}</strong>
              <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
              <Link to={`/filme/${movie.id}`}>Access</Link>

            </article>
          )
        })}
      </div>
      
    </div>
  )
}

export default Home
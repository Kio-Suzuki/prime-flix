import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import style from './movie.module.css';

function Filme() {

  const {id} = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    async function loadingMovies() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: 'dfa4fc8f554de20cd7318a5f3ae7a20c',
          language: 'pt-BR', 
        }
      })
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch(() => {
        console.log('Filme não encontrado');
        navigate('/', { replace: true })
      })
    }
    loadingMovies();

    return () => {
      console.log('Componente desmontado');
    }
  }, [navigate, id])

  function saveMovie() {
    const myList = localStorage.getItem('@primeflix');
    
    let savedMovies = JSON.parse(myList) || [];

    const alredySaved = savedMovies.some((savedMovie) => savedMovie.id === movie.id)

    if(alredySaved) {
      alert('filme na lista');
      return;
    }

    savedMovies.push(movie);
    localStorage.setItem('@primeflix', JSON.stringify(savedMovies));
    alert('filme salvo');
  }

  if(loading) {
    return (
      <div className={style.movieInfo}>
        <h1>Loading movie...</h1>
      </div>
    )
  }

  return (
    <div className={style.movieContainer}>
      <h1 className={style.title}>{movie.title}</h1>
      <img className={style.title} src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
      <h3>Sinopse</h3>
      <span>{movie.overview}</span>
      <strong>Avaliação: {movie.vote_average} / 10</strong>
      
      <div className={style.areaButtons}>
        <button onClick={saveMovie}>Save</button>
        <button>
          <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${movie.title}`}>Trailer</a>
        </button>
        
      </div>
    </div>
  )
}

export default Filme
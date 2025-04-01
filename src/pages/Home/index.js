import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import styles from './home.module.css';
import { Link } from 'react-router-dom';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get('movie/now_playing', {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: 'pt-BR',
          page: 1,
        },
      });
      setMovies(response.data.results);
      setLoading(false);
    }
    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <h2>Loading movies...</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.movieList}>
        <Swiper
          modules={[Pagination]}
          spaceBetween={5}
          slidesPerView={4}
          autoplay={true}
          grabCursor={true}
          pagination={{ clickable: true }}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  className={styles.movieImage}
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Home;

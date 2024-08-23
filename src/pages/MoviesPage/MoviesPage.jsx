import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { requestQueryMovie } from '../../services/api';

import style from "./MoviesPage.module.css"

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const location = useLocation();

  const handleSearch = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const queryValue = form.elements.query.value.trim();

    if (queryValue === '') return;
    setSearchParams({ query: queryValue });
  };

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const response = await requestQueryMovie(query);
        setMovies(response.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, [query]);
    
    console.log(movies)
  return (
    <div className={`container ${style.wrap}`}>
      <form onSubmit={handleSearch}>
        <input type="text" name="query" defaultValue={query} />
        <button type="submit">Search</button>
      </form>

      <ul className={`${style.list}`}>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`${movie.id}`} state={{ from: location }}>
                    <img
                        className={style.img}
                src={`https://image.tmdb.org/t/p/w500/` + movie.backdrop_path}
                alt=""
              />
              <h3>{movie.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default MoviePage;
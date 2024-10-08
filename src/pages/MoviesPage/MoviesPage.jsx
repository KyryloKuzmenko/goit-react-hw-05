import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { requestQueryMovie } from '../../services/api';

import style from "./MoviesPage.module.css"

const MoviePage = () => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };

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


  return (
    <div className={`container ${style.wrap}`}>
      <form className={style.form} onSubmit={handleSearch}>
        <input
          className={style.input}
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search for a movie"
        />
        <button className={style.submit} type="submit">
          Search
        </button>
      </form>

      <ul className={`${style.list}`}>
        {movies.map(movie => (
          <li className={style.li} key={movie.id}>
            <Link to={`${movie.id}`} state={{ from: location }}>
              <img
                className={style.img}
                src={`https://image.tmdb.org/t/p/w500/` + movie.poster_path}
                alt={movie.original_title}
              />
              <h3 className={style.title}>{movie.title}</h3>
            </Link>
            <p className={style.release}>
              {new Date(movie.release_date).toLocaleDateString(
                'en-US',
                options
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default MoviePage;
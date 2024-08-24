import style from "./MovieList.module.css"
import { Link, useLocation } from "react-router-dom";

const MovieList = ({ trendMovies }) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const location = useLocation();

    return (
      <ul className={`container ${style.movieList}`}>
        {trendMovies.map(
          ({ id, title, poster_path, release_date, original_title }) => (
            <li key={id} className={style.li}>
              <Link to={`movies/${id}`} state={{ from: location }}>
                <img
                  className={style.img}
                  src={'https://image.tmdb.org/t/p/w500/' + poster_path}
                  alt={original_title}
                />
                <h3 className={style.title}>{title}</h3>
              </Link>
              <p className={style.release}>
                {new Date(release_date).toLocaleDateString('en-US', options)}
              </p>
            </li>
          )
        )}
      </ul>
    );
}

export default MovieList;
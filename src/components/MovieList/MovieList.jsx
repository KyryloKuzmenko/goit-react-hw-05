import style from "./MovieList.module.css"

const MovieList = ({ trendMovies }) => {
  const options = { year: "numeric", month: "short", day: "numeric" };

    return (
      <ul className={`container ${style.movieList}`}>
        {trendMovies.map(({ id, title, poster_path, release_date }) => (
          <li key={id} className={style.li}>
            <img
              className={style.img}
              src={"https://image.tmdb.org/t/p/w500/" + poster_path}
              alt=""
            />
            <h3>{title}</h3>
            <p>{new Date(release_date).toLocaleDateString("en-US", options)}</p>
          </li>
        ))}
      </ul>
    );
}

export default MovieList;
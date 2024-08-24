import style from "./MovieDetailPage.module.css";

import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { requestDetailMovie } from "../../services/api";

import MovieReviews from "../../components/MovieReviews/MovieReviews";
import MovieCast from "../../components/MovieCast/MovieCast";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [detailMovie, setDetailMovie] = useState(null);
  const location = useLocation();
  const goBackLink = useRef(location.state?.from ?? "movies")

  useEffect(() => {
    const fetchMoviesDetails = async () => {
      try {
        const response = await requestDetailMovie(movieId);
        setDetailMovie(response);
      } catch (error) {}
    };
    fetchMoviesDetails();
  }, [movieId]);

  if (!detailMovie) {
    return <div>Loading...</div>;
  }


  const backdrop = {
      backgroundImage: `url('https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${detailMovie.backdrop_path}')`,
    };

  return (
    <div className={style.backGround}>
      <div className={`${style.wrap} ${style.backdrop}`} style={backdrop}>
        <div className={` ${style.goBackWrap}`}>
          <Link className={` ${style.goBack}`} to={goBackLink.current}>
            Go back
          </Link>
        </div>
        <div className={style.contentWrap}>
          <img
            className={`container ${style.img}`}
            src={'https://image.tmdb.org/t/p/w500/' + detailMovie.poster_path}
            alt={detailMovie.original_title}
          />
          <div className={`${style.text}`}>
            <h3 className={`${style.title}`}>{`${
              detailMovie.title
            } (${detailMovie.release_date.slice(0, 4)})`}</h3>
            <p className={style.p}>
              User score:{' '}
              {detailMovie.vote_average.toString().replace('.', '').slice(0, 2)}
              %
            </p>
            <h4 className={style.overview}>Overview</h4>
            <p>{detailMovie.overview}</p>
            <h4 className={style.genres}>Genres</h4>
            <ul>
              {detailMovie.genres.map(({ id, name }) => (
                <li key={id}>
                  <p>{name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={style.line}></div>
      <p className={`container ${style.info}`}>Addition information</p>
      <div className={`container ${style.wrap}`}>
        <Link className={style.cast} to="cast">
          Cast
        </Link>
        <Link className={style.reviews} to="reviews">
          Reviews
        </Link>
      </div>

      <Routes>
        <Route path="cast" element={<MovieCast />} />
        <Route path="reviews" element={<MovieReviews />} />
      </Routes>
    </div>
  );
};

export default MovieDetailPage;

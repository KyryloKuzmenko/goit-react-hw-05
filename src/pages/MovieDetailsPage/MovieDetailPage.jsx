import style from "./MovieDetailPage.module.css";

import { Link, Route, Routes, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { requestDetailMovie } from "../../services/api";

import MovieReviews from "../../components/MovieReviews/MovieReviews";
import MovieCast from "../../components/MovieCast/MovieCast";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [detailMovie, setDetailMovie] = useState(null);

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


  return (
    <div className={style.backGround}>
      <div className={`container ${style.wrap}`}>
        <img
          className={`${style.img}`}
          src={"https://image.tmdb.org/t/p/w500/" + detailMovie.poster_path}
          alt=""
        />
        <div className={style.text}>
          <h3 className={`${style.title}`}>{detailMovie.title}</h3>
          <p>{detailMovie.release_date}</p>
        </div>
      </div>

      <div className={`container ${style.wrap}`}>
        <Link to="cast">
          Cast
        </Link>
        <Link to="reviews">
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

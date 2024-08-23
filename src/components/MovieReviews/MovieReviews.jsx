import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestMovieReviews } from '../../services/api';
import sanitize from 'sanitize-html';

import style from "./MovieReviews.module.css"

const MovieReviews = () => {
  const [movieReviews, setMovieReviews] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await requestMovieReviews(movieId);
        setMovieReviews(response.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovieReviews();
  }, [movieId]);

  if (!movieReviews) {
    return null;
  }

  console.log(movieReviews);
  return (
    <div className={`container ${style.reviews}`}>
      {movieReviews.length > 0 ? (
        <ul>
          {movieReviews.map(({ id, author, content, author_details }) => (
            <li className={style.li} key={id}>
              {author_details.avatar_path && (
                <img
                  className={style.img}
                  src={
                    'https://image.tmdb.org/t/p/w500/' +
                    author_details.avatar_path
                  }
                  alt=""
                />
              )}
              <h4 className={style.h4}>{author}</h4>
              <p
                className={` ${style.p}`}
                dangerouslySetInnerHTML={{ __html: sanitize(content) }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet</p>
      )}
    </div>
  );
};

export default MovieReviews;

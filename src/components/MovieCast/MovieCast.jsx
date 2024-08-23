import { useParams } from "react-router-dom";
import { requestMovieCast } from "../../services/api";
import { useEffect, useState, useRef } from "react";
import style from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const response = await requestMovieCast(movieId);
        setMovieCast(response.cast);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  if (!movieCast) {
    return null;
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const itemWidth = scrollContainer.querySelector(
        `.${style.li}`
      ).offsetWidth;
      scrollContainer.scrollBy({
        left: direction * (itemWidth * 3),
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`container ${style.wrap}`}>
      <button className={style.scrollButton} onClick={() => scroll(-1)}>
        &#9664;
      </button>
      <ul className={style.list} ref={scrollRef}>
        {movieCast.map(({ id, name, character, profile_path }) => (
            <li className={style.li} key={id}>
                <div className={style.cast}>
            {profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                alt={name}
              />
            ) : (
              <div className={style.noImg}>No Image</div>
            )}
            <p>{name}</p>
            <p>{character}</p>

                </div>
          </li>
        ))}
      </ul>
      <button className={style.scrollButton} onClick={() => scroll(1)}>
        &#9654;
      </button>
    </div>
  );
};

export default MovieCast;

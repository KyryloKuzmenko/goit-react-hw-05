import { useEffect, useState } from "react";
import { requestMovie } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

import style from "./HomePage.module.css"

const HomePage = () => {
    
    const [trendMovie, setTrendMovie] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await requestMovie();
                setTrendMovie(data)
            } catch (error){
                console.log('oops')
            }
        }

        fetchMovies();
    }, [])

    console.log(trendMovie)

    return (
        <div className={`${style.container}`}>
            <h1>Trending today</h1>
            <MovieList trendMovies={trendMovie} />
        </div>
    )
}


export default HomePage;
import axios from "axios";

const API_KEY = "ff7c0b7d084ebf7da50b5241b5fb5a96";

export const requestMovie = async (query) => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/day",
      {
        params: {
          api_key: API_KEY
        },
      }
    );

    return response.data.results;
}
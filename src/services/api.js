import axios from 'axios';

const API_KEY = 'ff7c0b7d084ebf7da50b5241b5fb5a96';
const BASE_URL = 'https://api.themoviedb.org/3/';

//request trend movie
export const requestMovie = async query => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/trending/movie/day',
    {
      params: {
        api_key: API_KEY,
      },
    }
  );

  return response.data.results;
};

//request detail movie
export const requestDetailMovie = async movieId => {
  const response = await axios.get(`${BASE_URL}movie/${movieId}`, {
    params: {
      api_key: API_KEY,
    },
  });

  return response.data;
};

//request casts
export const requestMovieCast = async movieId => {
  const response = await axios.get(`${BASE_URL}movie/${movieId}/credits`, {
    params: {
      api_key: API_KEY,
    },
  });

  return response.data;
};

//request reviews
export const requestMovieReviews = async movieId => {
  const response = await axios.get(`${BASE_URL}movie/${movieId}/reviews`, {
    params: {
      api_key: API_KEY,
    },
  });

  return response.data;
};

//request movie

export const requestQueryMovie = async query => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}`,
    {
      params: {
        api_key: API_KEY,
      },
    }
  );

  return response.data;
};

export const requestLargeImg = async movieId => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/images`,
    {
      params: {
        api_key: API_KEY,
      },
    }
  );

  return response.data;
};

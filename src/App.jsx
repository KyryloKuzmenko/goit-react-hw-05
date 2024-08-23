import { useState } from 'react'
import Navigation from './components/Navigation/Navigation'

import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import MoviePage from './pages/MoviesPage/MoviesPage.jsx';

const MovieDetailPage = lazy(() => import("./pages/MovieDetailsPage/MovieDetailPage.jsx"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"))

function App() {

  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='movies' element={<MoviePage />} />
          <Route path="movies/:movieId/*" element={<MovieDetailPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App

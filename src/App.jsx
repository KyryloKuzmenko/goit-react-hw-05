import { useState } from 'react'
import Navigation from './components/Navigation/Navigation'

import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

const MovieDetailPage = lazy(() => import("./pages/MovieDetailsPage/MovieDetailPage.jsx"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"))

function App() {

  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="movies/:movieId/*" element={<MovieDetailPage />} />
          <Route path='/' element={<HomePage />}/>
        </Routes>
      </Suspense>
    </>
  );
}

export default App

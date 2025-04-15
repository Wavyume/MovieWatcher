import React from 'react';
import PostRequest from '../../api/PostRequest';
import MovieList from '../../components/MovieList/MovieList';
import useMovies from '../../hooks/useMovies';
import StartPoster from '../../components/StartPoster/StartPoster';
import cl from './Movies.module.css';

const categoriesConfig = [
  {title: 'Trending Movies', fetchFunc: PostRequest.getTrendingMovies},
  {title: 'Popular Movies', fetchFunc: PostRequest.getPopularMovies},
  {title: 'Top Rated Movies', fetchFunc: PostRequest.getTopRatedMovies},
  {title: 'Comedy Movies', fetchFunc: PostRequest.getByGenre, params: 35},
  {title: 'Action Movies', fetchFunc: PostRequest.getByGenre, params: 28},
  {title: 'Romantic Movies', fetchFunc: PostRequest.getByGenre, params: 10749},
  {title: 'Crime Movies', fetchFunc: PostRequest.getByGenre, params: 80},
  {title: 'Horror Movies', fetchFunc: PostRequest.getByGenre, params: 27},
];

const Movies = () => {
  const {movieCategories, loading, error} = useMovies(categoriesConfig);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error loading movies: {error.message}</p>;
  return (
    <div className={cl[`movies-wrapper`]}>
      <StartPoster movies={movieCategories[0].movies} />
      {movieCategories.map((category, index) => (
        <div className={cl[`movies-block`]} key={index}>
          <h2>{category.title}</h2>
          <MovieList movies={category.movies} />
        </div>
      ))}
    </div>
  );
};

export default Movies;

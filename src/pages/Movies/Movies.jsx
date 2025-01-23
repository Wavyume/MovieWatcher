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
];

const Movies = () => {
  const {movieCategories, loading, error, fetchMoreMovies} =
    useMovies(categoriesConfig);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error loading movies: {error.message}</p>;
  // console.log(movieCategories[0].movies);
  return (
    <div className={cl[`movies-wrapper`]}>
      <StartPoster movies={movieCategories[0].movies} />
      {movieCategories.map((category, index) => (
        <div className={cl[`movies-block`]} key={index}>
          <h2>{category.title}</h2>
          <MovieList
            movies={category.movies}
            // fetchMoreMovies={() => fetchMoreMovies(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default Movies;

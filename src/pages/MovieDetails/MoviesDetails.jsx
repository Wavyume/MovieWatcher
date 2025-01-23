import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import PostRequest from '../../api/PostRequest';
import {useDispatch, useSelector} from 'react-redux';
import {setMovieFullInfo, setLoading} from '../../store/moviesSlice';
import cl from './MovieDetails.module.css';

const MoviesDetails = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.movies[id]);
  const loading = useSelector((state) => state.movies?.loading);

  useEffect(() => {
    const fetchDetails = async () => {
      if (movie?.hasFullInfo) return;

      dispatch(setLoading(true));
      try {
        const fullData = await PostRequest.getMovieDetails(id);
        dispatch(
          setMovieFullInfo({
            id,
            fullData: {
              runtime: fullData.runtime,
              genres: fullData.genres,
              production_countries: fullData.production_countries[0].name,
              director: fullData.credits?.crew?.find(
                (p) => p.job === 'Director',
              )?.name,
            },
          }),
        );
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchDetails();
  }, [id, dispatch, movie?.hasFullInfo]);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className={cl['info-wrapper']}>
      <div className="poster">
        {movie.poster_path && (
          <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} />
        )}
      </div>
      <div className={cl.info}>
        <h1 className={cl.title}>
          {movie.title} <span className={cl.circle}>&bull;</span>{' '}
          {movie.release_date.slice(0, 4)}
        </h1>
        <div>Directed by {movie.director}</div>
        <div>{movie.production_countries}</div>
        <div>{`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}</div>
        {movie.genres && (
          <div>{movie.genres.map((genre) => genre.name).join(' | ')}</div>
        )}
        <div>{movie.overview}</div>
      </div>
    </div>
  );
};

export default MoviesDetails;

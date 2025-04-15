import React, {useEffect, useRef, useState} from 'react';
import PostRequest from '../../api/PostRequest';
import cl from './SearchResultsWindow.module.css';
import {Link} from 'react-router-dom';

const SearchResultsWindow = ({inputRef, isFocused}) => {
  const [movies, setMovies] = useState([]);

  const response_poster = 'https://image.tmdb.org/t/p/w92';
  const resWindowRef = useRef(null);

  useEffect(() => {
    const handleSearch = async () => {
      let responseResult = await PostRequest.searchMovie(
        inputRef.current.value.split(' ').join('+'),
      );
      const genreData = await PostRequest.getGenre(
        responseResult.map((movie) => movie.genre_ids[0]),
      );
      const moviesWithGenres = responseResult.map((movie, index) => ({
        ...movie,
        genre: genreData[index],
      }));

      setMovies(moviesWithGenres);
    };
    if (inputRef.current) {
      inputRef.current.addEventListener('input', handleSearch);
    }
  }, [inputRef]);

  useEffect(() => {
    if (resWindowRef.current) {
      resWindowRef.current.style.display = isFocused ? 'block' : 'none';
    }
  }, [isFocused]);

  return (
    <div
      style={{padding: movies.length > 0 ? '12px' : 0}}
      ref={resWindowRef}
      className={cl['info-wrapper']}>
      {movies.slice(0, 3).map((movie) => (
        <Link
          to={`/movie/${movie.id}`}
          style={{textDecoration: 'none'}}
          key={movie.id}>
          <div className={cl['info-block']}>
            <img src={`${response_poster}${movie.poster_path}`} />
            <div className={cl.info}>
              <h3>{movie.original_title}</h3>
              <h3>
                {movie.release_date.slice(0, 4)}, {movie.genre}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResultsWindow;

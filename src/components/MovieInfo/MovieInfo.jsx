import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faEarthAmericas,
  faClock,
  faMasksTheater,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/UI/Button/Button';
import cl from './MovieInfo.module.css';

const MovieInfo = ({movie, openModal}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={cl['info-wrapper']}>
      <div className={cl['poster-overlay']}>
        {movie.poster_path && (
          <img
            className={cl.poster}
            src={`https://image.tmdb.org/t/p/${
              windowWidth <= 768 ? 'original' : 'w342'
            }${movie.poster_path}`}
            alt={movie.title}
          />
        )}
      </div>
      <div className={cl.info}>
        <h1 className={cl.title}>
          {movie.title} <span className={cl.circle}>&bull;</span>{' '}
          {movie.release_date.slice(0, 4)}
        </h1>
        <div className={cl.directed}>
          Directed by <span className={cl.director}>{movie.director}</span>
        </div>
        <div>
          <FontAwesomeIcon className={cl.icon} icon={faEarthAmericas} />{' '}
          {movie.production_countries}
        </div>
        <div>
          <FontAwesomeIcon className={cl.icon} icon={faClock} />{' '}
          {`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
        </div>

        {movie.genres && (
          <div>
            <FontAwesomeIcon className={cl.icon} icon={faMasksTheater} />{' '}
            {movie.genres.map((genre) => genre.name).join(' | ')}
          </div>
        )}
        <div>{movie.overview}</div>
        <Button className={cl['play-trailer']} onClick={openModal}>
          Play Trailer
        </Button>
      </div>
    </div>
  );
};

export default MovieInfo;

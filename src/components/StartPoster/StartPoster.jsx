import React, {useState, useEffect} from 'react';
import cl from './StartPoster.module.css';
import Button from '../UI/Button/Button';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';

const response_poster = 'https://image.tmdb.org/t/p/original';

const StartPoster = ({movies}) => {
  const [randomFilm, setRandomFilm] = useState(
    movies[Math.floor(Math.random() * movies.length)],
  );
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomFilm(movies[Math.floor(Math.random() * movies.length)]);
      setKey((prevKey) => prevKey + 1);
    }, 10000);
  }, [movies]);

  return (
    <div className={cl[`poster-wrapper`]}>
      <div className={cl[`poster-content`]}>
        <div className={cl[`poster-title`]}>{randomFilm.title}</div>
        <Link
          style={{textDecoration: 'none'}}
          to={`/movie/${randomFilm.id}`}
          key={randomFilm.id}>
          <Button className={cl['details-button']}>Details</Button>
        </Link>
        <div className={cl[`poster-overview`]}>
          {randomFilm.overview.substr(0, 220) + '...'}
        </div>
      </div>
      <div className={cl[`poster-overlay`]}></div>
      <motion.img
        key={key}
        className={cl['start-poster']}
        src={`${response_poster}${randomFilm.backdrop_path}`}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 1}}
      />
    </div>
  );
};

export default StartPoster;

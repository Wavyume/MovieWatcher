import React from 'react';
import {motion} from 'framer-motion';
import cl from './MovieCard.module.css';
import {FaStar} from 'react-icons/fa';
import noposter from '../../assets/images/noposter.png';

const response_poster = 'https://image.tmdb.org/t/p/w185';

const cardVariants = {
  hidden: {scale: 0.8, opacity: 0},
  visible: {scale: 1, opacity: 1, transition: {duration: 0.3}},
};

const MovieCard = (props) => {
  return (
    <motion.div
      className={cl.post}
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{scale: 1.05}}
      whileTap={{scale: 0.95}}>
      <img
        src={
          props.movie.poster_path === null
            ? noposter
            : `${response_poster}${props.movie.poster_path}`
        }
      />
      <div className={cl.info}>
        <div className={cl.title}>{props.movie.title}</div>
        <div className={cl.rating}>
          <div>{props.movie.release_date.slice(0, 4)}</div>

          <FaStar className={cl.icon} size={15} />
          <div>{props.movie.vote_average.toFixed(1)}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;

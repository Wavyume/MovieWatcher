import React, {useEffect, useRef} from 'react';
import cl from './SimilarMovies.module.css';
import MovieCard from '../MovieCard/MovieCard';
import {Link} from 'react-router-dom';
import useSlider from '../../hooks/useSlider';
import {motion} from 'framer-motion';
import Button from '../UI/Button/Button';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import useVisibleItems from '../../hooks/useVisibleItems';

const SimilarMovies = ({similarMovies}) => {
  const containRef = useRef(null);
  const cardRef = useRef(null);
  const {visibleItemsCount} = useVisibleItems(containRef, cardRef);

  const {currentIndex, sliderOffset, prevSlide, nextSlide, resetSlider} =
    useSlider(similarMovies ? similarMovies.length : 0, visibleItemsCount);

  useEffect(() => {
    resetSlider();
  }, [similarMovies, resetSlider]);

  return (
    <div className={cl['similar-movies-wrapper']}>
      <Button
        onClick={prevSlide}
        className={`${cl.button} ${cl['button-prev']}`}>
        <FaChevronLeft size={30} />
      </Button>

      <div ref={containRef} className={cl['similar-movies']}>
        <motion.div
          className={cl['movies-list']}
          animate={{x: sliderOffset}}
          transition={{type: 'spring', stiffness: 100, damping: 15}}>
          {similarMovies.map((simMovie) => (
            <Link
              to={`/movie/${simMovie.id}`}
              key={simMovie.id}
              style={{textDecoration: 'none'}}>
              <div ref={cardRef} className={cl.card}>
                <MovieCard movie={simMovie} />
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      <Button
        onClick={nextSlide}
        className={`${cl.button} ${cl['button-next']}`}>
        <FaChevronRight size={30} />
      </Button>
    </div>
  );
};

export default SimilarMovies;

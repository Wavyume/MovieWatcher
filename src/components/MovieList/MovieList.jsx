import React, {useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import MovieCard from '../MovieCard/MovieCard';
import {motion, AnimatePresence} from 'framer-motion';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import cl from './MovieList.module.css';
import Button from '../UI/Button/Button';
import {useDispatch} from 'react-redux';
import {setMultipleMoviesBasicInfo} from '../../store/moviesSlice';
import useSlider from '../../hooks/useSlider';
import useVisibleItems from '../../hooks/useVisibleItems';

const MovieList = ({movies = []}) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  const {visibleItemsCount} = useVisibleItems(containerRef, cardRef, 19.2);

  const dispatch = useDispatch();

  const {currentIndex, sliderOffset, prevSlide, nextSlide} = useSlider(
    movies ? movies.length : 0,
    visibleItemsCount,
  );

  useEffect(() => {
    if (movies.length > 0) {
      const moviesData = movies.map((movie) => ({
        id: movie.id,
        movieData: {
          title: movie.title,
          poster_path: movie.poster_path,
          overview: movie.overview,
          release_date: movie.release_date,
          backdrop_path: movie.backdrop_path,
        },
      }));
      dispatch(setMultipleMoviesBasicInfo(moviesData));
    }
  }, [movies, dispatch]);

  return (
    <AnimatePresence mode="wait">
      <div className={cl['post-list']}>
        <Button
          onClick={prevSlide}
          className={`${cl['slider_button']} ${cl['slider_button-prev']}`}>
          <FaChevronLeft size={30} />
        </Button>
        <div className={cl['slider-track']}>
          <div ref={containerRef} className={cl.container}>
            <motion.div
              className={cl['movie-list']}
              initial={{x: 0}}
              animate={{x: sliderOffset}}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 15,
              }}>
              {movies.map((movie) => (
                <Link
                  style={{textDecoration: 'none'}}
                  to={`/movie/${movie.id}`}
                  key={movie.id}>
                  <div ref={cardRef} className={cl.card}>
                    <MovieCard key={movie.id} movie={movie} />
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
        <Button
          onClick={nextSlide}
          className={`${cl['slider_button']} ${cl['slider_button-next']}`}>
          <FaChevronRight size={30} />
        </Button>
      </div>
    </AnimatePresence>
  );
};

export default MovieList;

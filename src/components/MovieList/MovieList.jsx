import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import MovieCard from '../MovieCard/MovieCard';
import {motion, AnimatePresence} from 'framer-motion';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import cl from './MovieList.module.css';
import Button from '../UI/Button/Button';
import {useDispatch} from 'react-redux';
import {setMovieBasicInfo} from '../../store/moviesSlice';

const MovieList = ({movies = [], fetchMoreMovies}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const step = 6;
  const itemsPerPage = 7;
  const dispatch = useDispatch();

  const handleMovieClick = async (movie) => {
    try {
      await dispatch(
        setMovieBasicInfo({
          id: movie.id,
          movieData: {
            title: movie.title,
            poster_path: movie.poster_path,
            overview: movie.overview,
            release_date: movie.release_date,
          },
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - step, 0));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + step, movies.length - itemsPerPage),
    );
  };

  const sliderOffset = -currentIndex * (100 / itemsPerPage) + '%';

  return (
    <AnimatePresence mode="wait">
      <div className={cl['post-list']}>
        <Button
          onClick={prevSlide}
          className={'slider_button'}
          additionalClass={'slider_button-prev'}>
          <FaChevronLeft size={30} />
        </Button>
        <div className={cl['slider-track']}>
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
                key={movie.id}
                onClick={() => handleMovieClick(movie)}>
                <MovieCard key={movie.id} movie={movie} />
              </Link>
            ))}
          </motion.div>
        </div>
        <Button
          onClick={nextSlide}
          className={'slider_button'}
          additionalClass={'slider_button-next'}>
          <FaChevronRight size={30} />
        </Button>
      </div>
    </AnimatePresence>
  );
};

export default MovieList;

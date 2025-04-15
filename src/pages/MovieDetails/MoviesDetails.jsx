import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import PostRequest from '../../api/PostRequest';
import {useDispatch, useSelector} from 'react-redux';
import {
  setMovieFullInfo,
  setLoading,
  setMultipleMoviesBasicInfo,
} from '../../store/moviesSlice';
import cl from './MovieDetails.module.css';
import TrailerModal from '../../components/TrailerModal/TrailerModal';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import CastsSlider from '../../components/CastsSlider/CastsSlider';
import SimilarMovies from '../../components/SimilarMovies/SimilarMovies';

const MoviesDetails = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.movies[id]);
  const loading = useSelector((state) => state.movies?.loading);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moviesCredits, setMoviesCredits] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchDetails = async () => {
      if (movie?.hasFullInfo) return;

      dispatch(setLoading(true));
      try {
        const fullData = await PostRequest.getMovieDetails(id);
        if (!movie?.title) {
          dispatch(
            setMovieFullInfo({
              id,
              fullData: {
                title: fullData.title,
                poster_path: fullData.poster_path,
                overview: fullData.overview,
                release_date: fullData.release_date,
                backdrop_path: fullData.backdrop_path,
              },
            }),
          );
        }

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [credits, similars] = await Promise.all([
          PostRequest.getCredits(id),
          PostRequest.getSimilar(id),
        ]);
        const similarMoviesData = similars.results.map((movie) => ({
          id: movie.id,
          movieData: {
            title: movie.title,
            poster_path: movie.poster_path,
            overview: movie.overview,
            release_date: movie.release_date,
            backdrop_path: movie.backdrop_path,
          },
        }));
        dispatch(setMultipleMoviesBasicInfo(similarMoviesData));
        setMoviesCredits(credits);
        setSimilarMovies(similars.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  if (!movie) {
    return <div>Movie not found</div>;
  }
  return (
    <div className={cl['info-wrapper']}>
      <div className={cl['basic-info']}>
        <MovieInfo movie={movie} openModal={openModal} />
        <div className={cl['details-overlay']}> </div>
        <img
          className={cl.backdrop}
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          style={movie.backdrop_path ? {} : {display: 'none'}}></img>
      </div>
      <div className={cl['casts-wrapper']}>
        <h2 className={cl['slider-title']}>Cast</h2>
        <CastsSlider casts={moviesCredits} />
      </div>
      <div className={cl['similar-wrapper']}>
        <h2 className={cl['slider-title']}>More like this</h2>
        <SimilarMovies similarMovies={similarMovies} />
      </div>
      {isModalOpen && <TrailerModal movieId={id} closeModal={closeModal} />}
    </div>
  );
};

export default MoviesDetails;

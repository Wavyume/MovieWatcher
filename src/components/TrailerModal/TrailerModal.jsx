import React, {useState, useEffect} from 'react';
import PostRequest from '../../api/PostRequest';
import cl from './TrailerModal.module.css';

const TrailerModal = ({movieId, closeModal}) => {
  const [videoKey, setVideoKey] = useState(null);

  useEffect(() => {
    if (movieId) {
      const fetchTrailer = async () => {
        try {
          const response = await PostRequest.getMoviesTrailer(movieId);
          setVideoKey(response.results.find((el) => el.type === 'Trailer').key);
        } catch (error) {
          console.log(error);
        }
      };
      fetchTrailer();
    }
  }, [movieId]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={cl['modal-overlay']} onClick={handleOverlayClick}>
      <div className={cl['modal-content']}>
        <button className={cl['close-button']} onClick={closeModal}>
          &times;
        </button>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
      </div>
    </div>
  );
};

export default TrailerModal;

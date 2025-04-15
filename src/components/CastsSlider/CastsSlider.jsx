import React, {useEffect, useRef} from 'react';
import avatar from '../../assets/images/avatar.png';
import cl from './CastsSlider.module.css';
import {motion} from 'framer-motion';
import Button from '../UI/Button/Button';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import useSlider from '../../hooks/useSlider';
import useVisibleItems from '../../hooks/useVisibleItems';

const CastsSlider = ({casts}) => {
  const containRef = useRef(null);
  const cardRef = useRef(null);

  const {visibleItemsCount} = useVisibleItems(containRef, cardRef);

  const {currentIndex, sliderOffset, prevSlide, nextSlide, resetSlider} =
    useSlider(casts.cast ? casts.cast.length : 0, visibleItemsCount);

  useEffect(() => {
    resetSlider();
  }, [casts, resetSlider]);

  return (
    <div className={cl['casts-list-wrapper']}>
      <Button
        onClick={prevSlide}
        className={`${cl.button} ${cl['button-prev']}`}>
        <FaChevronLeft className={cl['button-pointer']} size={30} />
      </Button>
      <div ref={containRef} className={cl['casts-list']}>
        <motion.div
          className={cl['casts-slider']}
          initial={{x: 0}}
          animate={{x: sliderOffset}}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 15,
          }}>
          {Array.isArray(casts.cast) &&
            casts.cast.map((cast) => (
              <div ref={cardRef} className={cl['cast-card']}>
                <img
                  className={cl['cast-photo']}
                  src={
                    cast.profile_path === null
                      ? avatar
                      : `https://image.tmdb.org/t/p/w200/${cast.profile_path}`
                  }></img>
                <div className={cl['cast-name']}>{cast.name}</div>
                <div className={cl['cast-character']}>{cast.character}</div>
              </div>
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

export default CastsSlider;

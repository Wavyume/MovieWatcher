import {useState, useCallback} from 'react';

const useSlider = (itemsLength, visibleItemsCount) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const wholeItems = Math.floor(visibleItemsCount);
  // const partialItem = visibleItemsCount - wholeItems;

  const resetSlider = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - wholeItems, 0));
  }, [wholeItems]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + wholeItems;
      return Math.min(nextIndex, itemsLength - wholeItems);
    });
  }, [wholeItems, itemsLength]);

  const sliderOffset = -currentIndex * (100 / visibleItemsCount) + '%';

  return {
    currentIndex,
    sliderOffset,
    prevSlide,
    nextSlide,
    resetSlider,
  };
};

export default useSlider;

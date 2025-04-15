import {useState, useEffect} from 'react';

const useVisibleItems = (containerRef, cardRef, gapSize = 0) => {
  const [visibleItemsCount, setVisibleItemsCount] = useState(1);

  useEffect(() => {
    const calculateVisibleItems = () => {
      if (!containerRef.current) return;
      if (!cardRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const cardWidth = cardRef.current.offsetWidth;

      const count = (containerWidth + gapSize) / (cardWidth + gapSize);
      setVisibleItemsCount(Number(count.toFixed(1)));
    };

    calculateVisibleItems();
    window.addEventListener('resize', calculateVisibleItems);
    return () => window.removeEventListener('resize', calculateVisibleItems);
  }, []);
  return {visibleItemsCount};
};

export default useVisibleItems;

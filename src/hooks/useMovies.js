import {useState, useEffect} from 'react';

const useMovies = (categoriesConfig) => {
  const [movieCategories, setMovieCategories] = useState(
    categoriesConfig.map((category) => ({
      ...category,
      movies: [],
      currentPage: 1,
    })),
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const results = await Promise.all(
          categoriesConfig.map((category) =>
            category.fetchFunc(category.params ?? undefined),
          ),
        );

        const categories = results.map((result, index) => ({
          title: categoriesConfig[index].title,
          movies: result.results,
          currentPage: 1,
        }));

        setMovieCategories(categories);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return {movieCategories, loading, error};
};

export default useMovies;

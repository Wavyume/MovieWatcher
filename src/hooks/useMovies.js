import { useState, useEffect } from "react";

const useMovies = (categoriesConfig) => {
  const [movieCategories, setMovieCategories] = useState(
    categoriesConfig.map((category) => ({
      ...category,
      movies: [],
      currentPage: 1,
    }))
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const results = await Promise.all(
          categoriesConfig.map((category) => category.fetchFunc())
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

  const fetchMoreMovies = async (categoryIndex) => {
    try {
      const category = movieCategories[categoryIndex];
      const nextPage = category.currentPage + 1;
      const result = await category.fetchFunc(nextPage);

      setMovieCategories((prevCategories) => {
        const updatedCategories = [...prevCategories];
        updatedCategories[categoryIndex] = {
          ...category,
          movies: [...category.movies, ...result.results],
          currentPage: nextPage,
        };
        return updatedCategories;
      });
    } catch (err) {
      setError(err);
    }
  };

  return { movieCategories, loading, error, fetchMoreMovies };
};

export default useMovies;

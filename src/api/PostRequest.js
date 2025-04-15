import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

const response_url = 'https://api.themoviedb.org/3';

export default class PostRequest {
  static async fetchMovies(endpoint, params = {}) {
    const response = await axios.get(`${response_url}/${endpoint}`, {
      params: {
        api_key: api_key,
        ...params,
      },
    });
    return response.data;
  }

  static async getGenre(idArray) {
    const genreList = await PostRequest.fetchMovies('genre/movie/list');

    return idArray.map((id) => {
      const genre = genreList.genres.find((g) => g.id === id);
      return genre ? genre.name : ' ';
    });
  }

  static async searchMovie(movie) {
    const response = await axios.get(
      `${response_url}/search/movie?api_key=${api_key}&query=${movie}`,
    );
    return response.data.results;
  }

  static getByGenre(id) {
    return PostRequest.fetchMovies(`discover/movie?with_genres=${id}`);
  }

  static getSimilar(id) {
    return PostRequest.fetchMovies(`movie/${id}/similar`);
  }

  static getCredits(id) {
    return PostRequest.fetchMovies(`movie/${id}/credits`);
  }

  static getMoviesTrailer(id) {
    return PostRequest.fetchMovies(`movie/${id}/videos`);
  }

  static async getMovieDetails(id) {
    try {
      const [details, credits] = await axios.all([
        PostRequest.fetchMovies(`movie/${id}`),
        PostRequest.fetchMovies(`movie/${id}/credits`),
      ]);
      return {
        ...details,
        credits,
      };
    } catch (error) {}
  }

  static getTrendingMovies() {
    return PostRequest.fetchMovies('trending/movie/week');
  }
  static getPopularMovies() {
    return PostRequest.fetchMovies('movie/popular');
  }
  static getTopRatedMovies() {
    return PostRequest.fetchMovies('movie/top_rated');
  }
}

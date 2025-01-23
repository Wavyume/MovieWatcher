import axios from 'axios';

const api_key = '';

const response_url = 'https://api.themoviedb.org/3';

export default class PostRequest {
  static async fetchMovies(endpoint) {
    const response = await axios.get(
      `${response_url}/${endpoint}?api_key=${api_key}`,
    );
    return response.data;
  }

  static async getMovieDetails(id) {
    try {
      const [details, credits] = await axios.all([
        PostRequest.fetchMovies(`movie/${id}`),
        PostRequest.fetchMovies(`movie/${id}/credits`),
      ]);
      console.log('Details Response:', details);
      console.log('Credits Response:', credits);
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

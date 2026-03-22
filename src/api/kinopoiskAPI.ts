import axios from 'axios';
import { Movie, Filters, MoviesResponce } from '../types';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'X-API-KEY': API_KEY,
        'Content-Type': 'application/json'
    }
});

export const searchAPI = {
    
    moviesGet: async (params: Filters = {}): Promise<MoviesResponce> => {
        const { data } = await apiClient.get('/movie', {
            params: {
                page: params.page || 1,
                limit: params.limit || 50,
                'rating.kp': params.ratingStart && params.ratingFinish 
                    ? `${params.ratingStart}-${params.ratingFinish}`
                    : undefined,
                year: params.yearStart && params.yearFinish 
                    ? `${params.yearStart}-${params.yearFinish}`
                    : undefined,
                'genres.name': params.genres?.join(',') || undefined,
            },
        });
        return data;
    },

    movieGetById: async (id: number): Promise<Movie> => {
        const { data } = await apiClient.get(`/movie/${id}`);
        return data;
    },

    movieGetByName: async (query: string, params: Filters = {}): Promise<MoviesResponce> => {
        const { data } = await apiClient.get('/movie/search', {
            params: {
                query,
                page: params.page || 1,
                limit: params.limit || 50,
            },
        });
        return data;
    }
} 
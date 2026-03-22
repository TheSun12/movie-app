import { useState, useEffect, useCallback } from 'react';
import { searchAPI } from '../api/kinopoiskAPI';
import { Movie, Filters } from '../types';

export const useMovies = (selectedFilters: Filters = {}) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [moreMovies, setMoreMovies] = useState(true);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState<Filters>(selectedFilters);

    const loadMovies = useCallback(async (reset = false) => {
        setLoading(true);
        try {
            const currentPage = reset ? 1 : page;
            const response = await searchAPI.moviesGet({
                ...filters,
                page: currentPage,
                limit: 50,
            });
            setMovies(prev => reset ? response.docs : [...prev, ...response.docs]);
            setMoreMovies(currentPage < response.pages);
        if (reset) setPage(2);
        else setPage(prev => prev + 1);
        } 
        catch (error) {
            setMoreMovies(false);
        } 
        finally {
            setLoading(false);
        }
    }, [filters, page]);

    useEffect(() => {
        setMovies([]);
        setPage(1);
        setMoreMovies(true);
        loadMovies(true);
    }, [filters]);

    return { movies, loading, moreMovies, loadMore: () => loadMovies(), setFilters, filters };
};
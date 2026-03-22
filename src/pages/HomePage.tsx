import React from 'react';
import { Icon28ErrorCircleOutline } from '@vkontakte/icons';
import { MovieCard } from '../components/MovieCard';
import { ChooseFilters } from '../components/Filters';
import { InfiniteScroll } from '../components/InfinityScroll';
import { useMovies } from '../hooks/useMovies';
import { useFavorite } from '../hooks/useFavorite';
import { useCompare } from '../hooks/useComparision';
import { useSearchParams } from 'react-router-dom';
import { Movie } from '../types';


export const HomePage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { movies, loading, moreMovies, loadMore, filters, setFilters } = useMovies();
    const { isFavorite, addFavorite, deleteFavorite } = useFavorite();
    const { isComparing, appendCompare } = useCompare();

    React.useEffect(() => {
        const urlFilters = {
        genres: searchParams.get('genres')?.split(',') || [],
        ratingStart: Number(searchParams.get('ratingStart')) || undefined,
        ratingFinish: Number(searchParams.get('ratingFinish')) || undefined,
        yearStart: Number(searchParams.get('yearStart')) || undefined,
        yearFinish: Number(searchParams.get('yearFinish')) || undefined,
        };
        if (Object.keys(urlFilters).some(key => urlFilters[key as keyof typeof urlFilters])) {
            setFilters(urlFilters);
        }
    }, []);

    React.useEffect(() => {
        const params = new URLSearchParams();
        if (filters.genres?.length) params.set('genres', filters.genres.join(','));
        if (filters.ratingStart) params.set('ratingStart', String(filters.ratingStart));
        if (filters.ratingFinish) params.set('ratingFinish', String(filters.ratingFinish));
        if (filters.yearStart) params.set('yearStart', String(filters.yearStart));
        if (filters.yearFinish) params.set('yearFinish', String(filters.yearFinish));
        setSearchParams(params);
    }, [filters, setSearchParams]);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await loadMore();
        setRefreshing(false);
    };

    const handleFavoriteClick = (movie: Movie, isFav: boolean) => {
        if (isFav) {
            deleteFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
    };

    const styles = {
        page: {
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
        },
        container: {
            padding: '16px',
        },
        loadingContainer: {
            textAlign: 'center' as const,
            padding: '32px',
        },
        spinner: {
            display: 'inline-block',
            width: '32px',
            height: '32px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #0077FF',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
        },
        placeholder: {
            textAlign: 'center' as const,
            padding: '48px 24px',
            backgroundColor: '#fff',
            borderRadius: '12px',
            margin: '16px',
        },
        placeholderIcon: {
            marginBottom: '16px',
            color: '#ccc',
        },
        placeholderTitle: {
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '8px',
            color: '#333',
        },
        placeholderText: {
            fontSize: '14px',
            color: '#999',
        },
        moviesList: {
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '12px',
        },
    };

    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `@keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }`;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const Spinner = () => <div style={styles.spinner} />;

    return (
        <div style={styles.page}>
            <div style={{ position: 'relative' }}
                onTouchStart={(e) => {
                    const startY = e.touches[0].clientY;
                    const handleTouchMove = (moveEvent: TouchEvent) => {
                        const deltaY = moveEvent.touches[0].clientY - startY;
                        if (deltaY > 80 && !refreshing) {
                            onRefresh();
                            document.removeEventListener('touchmove', handleTouchMove);
                        }
                    };
                    document.addEventListener('touchmove', handleTouchMove);
                    document.addEventListener('touchend', () => {
                        document.removeEventListener('touchmove', handleTouchMove);
                    }, { once: true });
                }}
            >
                {refreshing && (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '16px',
                        backgroundColor: '#f5f5f5'
                    }}>
                        <Spinner />
                        <div style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
                            Обновление...
                        </div>
                    </div>
                )}
            </div>
            <div style={styles.container}>
                <ChooseFilters filters={filters} onFiltersChange={setFilters} />
                <InfiniteScroll hasMore={moreMovies} loading={loading} onLoadMore={() => loadMore()}>
                    <div style={styles.moviesList}>
                        {movies.map(movie => (
                            <MovieCard key={movie.id} movie={movie} isFavorite={isFavorite(movie.id)} 
                                onFavoriteClick={() => handleFavoriteClick(movie, isFavorite(movie.id))}
                                onCompareClick={appendCompare} isComparing={isComparing(movie.id)}/>
                        ))}
                    </div>
                </InfiniteScroll>
                
                {loading && (
                    <div style={styles.loadingContainer}>
                        <Spinner />
                    </div>
                )}
                
                {!loading && movies.length === 0 && (
                    <div style={styles.placeholder}>
                        <div style={styles.placeholderIcon}>
                            <Icon28ErrorCircleOutline width={56} height={56} fill="#ccc" />
                        </div>
                        <div style={styles.placeholderTitle}>Фильмы не найдены</div>
                        <div style={styles.placeholderText}>
                            Попробуйте изменить параметры фильтрации
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
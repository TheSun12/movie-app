import React from 'react';
import { Icon28FavoriteOutline } from '@vkontakte/icons';
import { useNavigate } from 'react-router-dom';
import { MovieCard } from '../components/MovieCard';
import { useFavorite } from '../hooks/useFavorite';
import { useCompare } from '../hooks/useComparision';
import { Movie } from '../types';

export const FavoritesPage: React.FC = () => {
    const navigate = useNavigate();
    const { storage, deleteFavorite } = useFavorite();
    const { isComparing, appendCompare } = useCompare();

    const handleRemoveFromFavorites = (movie: Movie) => {
        deleteFavorite(movie.id);
    };

    const styles = {
        page: {
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
        },
        container: {
            padding: '16px',
        },
        header: {
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        },
        title: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '8px',
        },
        count: {
            fontSize: '14px',
            color: '#999',
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
            marginBottom: '24px',
        },
        placeholderButton: {
            backgroundColor: '#0077FF',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background-color 0.2s',
        },
        moviesList: {
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '12px',
        },
    };

    if (storage.length === 0) {
        return (
            <div style={styles.page}>
                <div style={styles.placeholder}>
                    <div style={styles.placeholderIcon}>
                        <Icon28FavoriteOutline width={56} height={56} fill="#ccc" />
                    </div>
                    <div style={styles.placeholderTitle}>Нет избранных фильмов</div>
                    <div style={styles.placeholderText}>
                        Добавляйте фильмы в избранное, чтобы они появились здесь
                    </div>
                    <button
                        style={styles.placeholderButton}
                        onClick={() => navigate('/')}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#005fcb'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#0077FF'; }}>
                        Перейти на главную
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <div style={styles.title}>Избранные фильмы</div>
                    <div style={styles.count}>
                        Всего: {storage.length} {storage.length === 1 ? 'фильм' : 'фильмов'}
                    </div>
                </div>
                <div style={styles.moviesList}>
                    {storage.map(movie => (
                        <MovieCard key={movie.id} movie={movie} isFavorite={true} onFavoriteClick={handleRemoveFromFavorites}
                            onCompareClick={appendCompare} isComparing={isComparing(movie.id)}/>
                    ))}
                </div>
            </div>
        </div>
    );
};
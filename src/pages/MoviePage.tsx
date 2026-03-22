import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon12StarCircleFillYellow, Icon28FavoriteOutline, Icon28Favorite } from '@vkontakte/icons';
import { searchAPI } from '../api/kinopoiskAPI';
import { Movie } from '../types';
import { useFavorite } from '../hooks/useFavorite';

export const MoviePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [movie, setMovie] = React.useState<Movie | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const { isFavorite, addFavorite, deleteFavorite } = useFavorite();

    React.useEffect(() => {
        const loadMovie = async () => {
            if (!id) {
                setError('ID фильма не указан');
                setLoading(false);
                return;
            }
            
            setLoading(true);
            setError(null);
            
            try {
                const data = await searchAPI.movieGetById(Number(id));
                setMovie(data);
            } catch (err) {
                setError('Не удалось загрузить фильм');
            } finally {
                setLoading(false);
            }
        };
        loadMovie();
    }, [id]);

    const styles = {
        page: {
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
        },
        header: {
            backgroundColor: '#0077FF',
            color: '#fff',
            padding: '14px 16px',
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'center' as const,
            position: 'sticky' as const,
            top: 0,
            zIndex: 100,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        backButton: {
            position: 'absolute' as const,
            left: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '8px',
            transition: 'background-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        content: {
            padding: '20px',
            maxWidth: '600px',
            margin: '0 auto',
        },
        posterContainer: {
            textAlign: 'center' as const,
            marginBottom: '20px',
        },
        poster: {
            width: '200px',
            height: '300px',
            borderRadius: '12px',
            objectFit: 'cover' as const,
            margin: '0 auto',
            backgroundColor: '#f0f0f0',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
        posterPlaceholder: {
            width: '200px',
            height: '300px',
            borderRadius: '12px',
            backgroundColor: '#f5f5f5',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ccc',
        },
        title: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '12px',
            textAlign: 'center' as const,
        },
        ratingContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
        },
        ratingValue: {
            fontWeight: 'bold',
            fontSize: '20px',
            marginLeft: '8px',
            color: '#0077FF',
        },
        ratingMax: {
            fontSize: '14px',
            color: '#999',
            marginLeft: '4px',
        },
        favoriteButton: {
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '24px',
            border: 'none',
        },
        favoriteButtonActive: {
            backgroundColor: '#0077FF',
            color: '#fff',
        },
        favoriteButtonInactive: {
            backgroundColor: 'transparent',
            color: '#0077FF',
            border: '1px solid #0077FF',
        },
        sectionTitle: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#666',
            marginBottom: '8px',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.5px',
        },
        description: {
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#333',
            marginBottom: '20px',
        },
        infoRow: {
            marginBottom: '16px',
        },
        infoLabel: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#666',
            marginBottom: '4px',
        },
        infoValue: {
            fontSize: '15px',
            color: '#333',
        },
        genresContainer: {
            display: 'flex',
            flexWrap: 'wrap' as const,
            gap: '8px',
            marginBottom: '20px',
        },
        genre: {
            backgroundColor: '#f0f0f0',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '13px',
            color: '#666',
        },
        loadingContainer: {
            textAlign: 'center' as const,
            padding: '64px',
        },
        spinner: {
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #0077FF',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
        },
        placeholder: {
            textAlign: 'center' as const,
            padding: '48px 24px',
            backgroundColor: '#fff',
            borderRadius: '12px',
            margin: '20px',
        },
        placeholderTitle: {
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#333',
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
        },
    };

    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const Spinner = () => <div style={styles.spinner} />;

    if (loading) {
        return (
            <div style={styles.page}>
                <div style={styles.loadingContainer}>
                    <Spinner />
                </div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div style={styles.page}>
                <div style={styles.placeholder}>
                    <div style={styles.placeholderTitle}>Фильм не найден</div>
                    <button style={styles.placeholderButton} onClick={() => navigate('/')}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#005fcb'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#0077FF'; }}>
                        На главную
                    </button>
                </div>
            </div>
        );
    }

    const rating = movie.rating?.kp || movie.rating?.imdb || 0;
    const isFav = isFavorite(movie.id);
    const posterUrl = movie.poster?.url;

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <button style={styles.backButton} onClick={() => navigate(-1)}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                    ←
                </button>
                {movie.name || movie.alternativeName}
            </div>
            <div style={styles.content}>
                <div style={styles.posterContainer}>
                    {posterUrl ? (
                        <img src={posterUrl} alt={movie.name} style={styles.poster}
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                const placeholder = (e.target as HTMLImageElement).nextElementSibling;
                                if (placeholder) {
                                    (placeholder as HTMLElement).style.display = 'flex';
                                }
                            }}
                        />
                    ) : (
                        <div style={styles.posterPlaceholder}>
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" />
                                <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" stroke="currentColor" />
                                <path d="M21 15l-5-4-3 3-4-4-5 5" stroke="currentColor" />
                            </svg>
                        </div>
                    )}
                </div>
                <div style={styles.title}>{movie.name || movie.alternativeName}</div>
                <div style={styles.ratingContainer}>
                    <Icon12StarCircleFillYellow width={24} height={24} fill="#ffc107" />
                    <span style={styles.ratingValue}>{rating.toFixed(1)}</span>
                    <span style={styles.ratingMax}>/ 10</span>
                </div>
                <button
                    style={{
                        ...styles.favoriteButton,
                        ...(isFav ? styles.favoriteButtonActive : styles.favoriteButtonInactive)
                    }}
                    onClick={() => isFav ? deleteFavorite(movie.id) : addFavorite(movie)}
                    onMouseEnter={(e) => {
                        if (!isFav) {
                            e.currentTarget.style.backgroundColor = '#fff0f0';
                        } else {
                            e.currentTarget.style.backgroundColor = '#005cfb';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isFav) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                        } else {
                            e.currentTarget.style.backgroundColor = '#0077FF';
                        }
                    }}>
                    {isFav ? (
                        <Icon28Favorite fill="#fff" />
                    ) : (
                        <Icon28FavoriteOutline fill="#0077FF" />
                    )}
                    {isFav ? 'В избранном' : 'В избранное'}
                </button>
                <div style={styles.sectionTitle}>О фильме</div>
                <div style={styles.description}>
                    {movie.description || 'Описание отсутствует'}
                </div>
                <div style={styles.infoRow}>
                    <div style={styles.infoLabel}>Год выпуска</div>
                    <div style={styles.infoValue}>{movie.year || 'Не указан'}</div>
                </div>
                {movie.genres && movie.genres.length > 0 && (
                    <>
                        <div style={styles.infoLabel}>Жанры</div>
                        <div style={styles.genresContainer}>
                            {movie.genres.map((genre, index) => (
                                <span key={index} style={styles.genre}>
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
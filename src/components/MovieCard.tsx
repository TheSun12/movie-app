import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon24Favorite, Icon24FavoriteOutline, Icon24StarsOutline, Icon56CameraOutline } from '@vkontakte/icons';
import { Movie } from '../types';

interface MovieCardProps {
    movie: Movie;
    isFavorite?: boolean;
    isComparing?: boolean;
    onFavoriteClick?: (movie: Movie) => void;
    onCompareClick?: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
    movie,
    isFavorite = false,
    onFavoriteClick,
    onCompareClick,
    isComparing = false,
    }) => {
    const navigate = useNavigate();
    const rating = movie.rating?.kp || movie.rating?.imdb || 0;
    const posterUrl = movie.poster?.url;
    const [imageError, setImageError] = React.useState(false);

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const img = e.currentTarget;
        img.style.display = 'none';
        const placeholder = img.nextElementSibling as HTMLElement;
        if (placeholder) {
            placeholder.style.display = 'flex';
        }
        setImageError(true);
    };

    const styles = {
        card: {
            marginBottom: '10px',
            cursor: 'pointer',
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e0e0e0',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        },
        cardHover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
        },
        container: {
            display: 'flex',
            padding: '12px',
        },
        poster: {
            width: '96px',
            height: '96px',
            borderRadius: '8px',
            objectFit: 'cover' as const,
            backgroundColor: '#f0f0f0',
            marginRight: '12px',
            flexShrink: 0,
        },
        posterPlaceholder: {
            width: '96px',
            height: '96px',
            borderRadius: '8px',
            backgroundColor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px',
            flexShrink: 0,
            color: '#999',
        },
        info: {
            flex: 1,
        },
        title: {
            fontSize: '16px',
            fontWeight: 600,
            marginBottom: '4px',
            color: '#333',
            lineHeight: 1.3,
        },
        year: {
            fontSize: '13px',
            color: '#999',
            marginBottom: '8px',
        },
        ratingContainer: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '12px',
        },
        ratingValue: {
            fontWeight: 600,
            fontSize: '15px',
            color: '#0077FF',
            marginLeft: '4px',
        },
        ratingMax: {
            fontSize: '13px',
            color: '#999',
            marginLeft: '4px',
        },
        actions: {
            display: 'flex',
            gap: '12px',
        },
        iconButton: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'background-color 0.2s ease',
        },
        iconButtonHover: {
            backgroundColor: '#f5f5f5',
        },
    };
    
    return (
        <div 
            style={styles.card}
            onClick={() => navigate(`/movie/${movie.id}`)}
            onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.transform = 'translateY(-2px)';
                target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            }}>
            <div style={styles.container}>
                {posterUrl && !imageError ? (
                    <img src={posterUrl} alt={movie.name} style={styles.poster} onError={handleImageError}/>
                ) : null}
                {(!posterUrl || imageError) && (
                    <div style={styles.posterPlaceholder}>
                        <Icon56CameraOutline width={40} height={40} fill="#ccc" />
                    </div>
                )}
                
                <div style={styles.info}>
                    <div style={styles.title}>
                        {movie.name || movie.alternativeName}
                    </div>
                    <div style={styles.year}>
                        {movie.year || 'Год неизвестен'}
                    </div>
                    
                    <div style={styles.ratingContainer}>
                        <Icon24StarsOutline width={20} height={20} fill="#ffb514" />
                        <span style={styles.ratingValue}>{rating.toFixed(1)}</span>
                        <span style={styles.ratingMax}>/ 10</span>
                    </div>
                    
                    <div style={styles.actions}>
                        <button style={styles.iconButton}
                            onClick={(e) => {
                                e.stopPropagation();
                                onFavoriteClick?.(movie);
                            }}
                            title={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f5f5f5';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}>
                            {isFavorite ? (
                                <Icon24Favorite fill="#0077FF" />
                            ) : (
                                <Icon24FavoriteOutline fill="#666" />
                            )}
                        </button>
                        
                        <button style={styles.iconButton}
                            onClick={(e) => {
                                e.stopPropagation();
                                onCompareClick?.(movie);
                            }}
                            title={isComparing ? "Удалить из сравнения" : "Добавить в сравнение"}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f5f5f5';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 5L8 23M20 5L20 23M5 8L23 8M5 20L23 20" stroke={isComparing ? "#0077FF" : "#666"} strokeWidth="2" strokeLinecap="round"/>
                                <path d="M12 12L16 16M16 12L12 16" stroke={isComparing ? "#0077FF" : "#666"} strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
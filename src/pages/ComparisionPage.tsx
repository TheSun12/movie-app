import React from 'react';
import { Icon28ListOutline, Icon28DeleteOutline, Icon12StarCircleFillYellow } from '@vkontakte/icons';
import { useNavigate } from 'react-router-dom';
import { useCompare } from '../hooks/useComparision';

export const ComparePage: React.FC = () => {
    const navigate = useNavigate();
    const { compare, deleteFromCompare, clearAllCompare } = useCompare();
    const [showClearAlert, setShowClearAlert] = React.useState(false);

    const handleRemoveFromCompare = (id: number) => {
        deleteFromCompare(id);
    };

    const handleClearAllCompare = () => {
        clearAllCompare();
        setShowClearAlert(false);
    };

    const styles = {
        page: {
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
        },
        header: {
            backgroundColor: '#0077FF',
            color: '#fff',
            padding: '14px 16px',
            fontSize: '20px',
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
            fontSize: '20px',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '8px',
            transition: 'background-color 0.2s',
        },
        container: {
            padding: '16px',
        },
        headerRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            backgroundColor: '#fff',
            padding: '12px 16px',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        },
        title: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#333',
        },
        subtitle: {
            fontSize: '14px',
            color: '#999',
            marginTop: '4px',
        },
        clearButton: {
            background: 'none',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#0077FF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s',
        },
        cardsContainer: {
            display: 'flex',
            flexWrap: 'wrap' as const,
            gap: '16px',
        },
        cardWrapper: {
            flex: '1 1 calc(50% - 16px)',
            minWidth: '280px',
        },
        card: {
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '16px',
            height: '100%',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e0e0e0',
            position: 'relative' as const,
        },
        deleteButton: {
            position: 'absolute' as const,
            top: '-8px',
            right: '-8px',
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            zIndex: 10,
        },
        poster: {
            width: '120px',
            height: '180px',
            borderRadius: '8px',
            objectFit: 'cover' as const,
            margin: '0 auto 16px',
            display: 'block',
            backgroundColor: '#f0f0f0',
        },
        posterPlaceholder: {
            width: '120px',
            height: '180px',
            borderRadius: '8px',
            backgroundColor: '#f5f5f5',
            margin: '0 auto 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ccc',
        },
        movieTitle: {
            fontSize: '18px',
            fontWeight: 600,
            textAlign: 'center' as const,
            marginBottom: '16px',
            color: '#333',
        },
        comparisonTable: {
            marginTop: '16px',
        },
        comparisonRow: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 0',
            borderBottom: '1px solid #f0f0f0',
        },
        rowLabel: {
            fontWeight: 500,
            color: '#666',
        },
        rowValue: {
            color: '#333',
        },
        ratingValue: {
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
        },
        modalOverlay: {
            position: 'fixed' as const,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
        },
        modalContent: {
            backgroundColor: '#fff',
            borderRadius: '12px',
            maxWidth: '400px',
            width: '90%',
            padding: '24px',
            textAlign: 'center' as const,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
        modalTitle: {
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '12px',
            color: '#333',
        },
        modalText: {
            fontSize: '16px',
            color: '#666',
            marginBottom: '24px',
        },
        modalButtons: {
            display: 'flex',
            gap: '12px',
        },
        modalButton: {
            flex: 1,
            padding: '12px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 500,
            cursor: 'pointer',
            border: 'none',
            transition: 'all 0.2s',
        },
        modalButtonCancel: {
            backgroundColor: '#f5f5f5',
            color: '#666',
        },
        modalButtonConfirm: {
            backgroundColor: '#0077FF',
            color: '#fff',
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
        },
    };

    const PosterPlaceholder = () => (
        <div style={styles.posterPlaceholder}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" />
                <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" stroke="currentColor" />
                <path d="M21 15l-5-4-3 3-4-4-5 5" stroke="currentColor" />
            </svg>
        </div>
    );

    if (compare.length === 0) {
        return (
            <div style={styles.page}>
                <div style={styles.header}>
                    <button
                        style={styles.backButton}
                        onClick={() => navigate(-1)}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                        ←
                    </button>
                    Сравнение фильмов
                </div>
                <div style={styles.placeholder}>
                    <div style={styles.placeholderIcon}>
                        <Icon28ListOutline width={56} height={56} fill="#ccc" />
                    </div>
                    <div style={styles.placeholderTitle}>Нет фильмов для сравнения</div>
                    <div style={styles.placeholderText}>Добавьте два фильма для сравнения</div>
                    <button
                        style={styles.placeholderButton}
                        onClick={() => navigate('/')}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0077FF'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#0077FF'; }}>
                        Перейти на главную
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div style={styles.page}>
                <div style={styles.container}>
                    <div style={styles.headerRow}>
                        <div>
                            <div style={styles.title}>Сравнение</div>
                            <div style={styles.subtitle}>
                                {compare.length === 2 
                                    ? 'Сравниваются 2 фильма' 
                                    : `Выбрано ${compare.length} из 2 фильмов`}
                            </div>
                        </div>
                        <button
                            style={styles.clearButton}
                            onClick={() => setShowClearAlert(true)}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fff5f5'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                            <Icon28DeleteOutline width={20} height={20} fill="#0077FF" />
                            Очистить
                        </button>
                    </div>
                    <div style={styles.cardsContainer}>
                        {compare.map(movie => (
                            <div key={movie.id} style={styles.cardWrapper}>
                                <div style={styles.card}>
                                    <button
                                        style={styles.deleteButton}
                                        onClick={() => handleRemoveFromCompare(movie.id)}
                                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f5f5f5'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; }}>
                                        <Icon28DeleteOutline width={18} height={18} fill="#999" />
                                    </button>
                                    {movie.poster?.url ? (
                                        <img src={movie.poster?.url} alt={movie.name} style={styles.poster}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                                const placeholder = (e.target as HTMLImageElement).nextElementSibling;
                                                if (placeholder) {
                                                    (placeholder as HTMLElement).style.display = 'flex';
                                                }
                                            }}
                                        />
                                    ) : (
                                        <PosterPlaceholder />
                                    )}
                                    <div style={styles.movieTitle}>{movie.name}</div>
                                    <div style={styles.comparisonTable}>
                                        <div style={styles.comparisonRow}>
                                            <span style={styles.rowLabel}>Год</span>
                                            <span style={styles.rowValue}>{movie.year || '—'}</span>
                                        </div>
                                        <div style={styles.comparisonRow}>
                                            <span style={styles.rowLabel}>Рейтинг</span>
                                            <div style={styles.ratingValue}>
                                                <Icon12StarCircleFillYellow width={18} height={18} fill="#ffc107" />
                                                <span>{(movie.rating?.kp || movie.rating?.imdb)?.toFixed(1) || '—'}</span>
                                            </div>
                                        </div>
                                        <div style={styles.comparisonRow}>
                                            <span style={styles.rowLabel}>Жанры</span>
                                            <span style={styles.rowValue}>{movie.genres?.map(g => g.name).join(', ') || '—'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showClearAlert && (
                <div style={styles.modalOverlay} onClick={() => setShowClearAlert(false)}>
                    <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalTitle}>Очистить сравнение</div>
                        <div style={styles.modalText}>
                            Вы уверены, что хотите удалить все фильмы из сравнения?
                        </div>
                        <div style={styles.modalButtons}>
                            <button
                                style={{ ...styles.modalButton, ...styles.modalButtonCancel }}
                                onClick={() => setShowClearAlert(false)}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e8e8e8'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f5f5f5'; }}>
                                Отмена
                            </button>
                            <button
                                style={{ ...styles.modalButton, ...styles.modalButtonConfirm }}
                                onClick={handleClearAllCompare}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#005fcb'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#0077FF'; }}>
                                Очистить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
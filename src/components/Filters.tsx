import React, { useState, useEffect } from 'react';
import { Filters } from '../types';

const GENRES = ['аниме', 'биография', 'боевик', 'вестерн', 'военный', 'детектив', 'детский', 
                'для взрослых', 'документальный', 'драма', 'игра', 'история', 'комедия',
                'концерт', 'короткометражка', 'криминал', 'мелодрама', 'музыка', 'мультфильм',
                'мюзикл', 'новости', 'приключения', 'реальное ТВ', 'семейный', 'спорт', 'ток-шоу',
                'триллер', 'ужасы', 'фантастика', 'фильм-нуар', 'фэнтези', 'церемония'];

interface FiltersProps {
    filters: Filters;
    onFiltersChange: (filters: Filters) => void;
}

export const ChooseFilters: React.FC<FiltersProps> = ({ filters, onFiltersChange }) => {
    const [localFilters, setLocalFilters] = useState<Filters>(filters);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleGenreToggle = (genre: string) => {
        const currentGenres = localFilters.genres || [];
        const newGenres = currentGenres.includes(genre) ? currentGenres.filter(g => g !== genre) : [...currentGenres, genre];
        setLocalFilters({ ...localFilters, genres: newGenres });
    };

    const handleApply = () => {
        onFiltersChange(localFilters);
        setExpanded(false);
    };

    const handleReset = () => {
        const resetFilters: Filters = {
            genres: [],
            ratingStart: 0,
            ratingFinish: 10,
            yearStart: 1990,
            yearFinish: new Date().getFullYear(),
        };
        setLocalFilters(resetFilters);
        onFiltersChange(resetFilters);
        setExpanded(false);
    };

    const activeFiltersCount = (localFilters.genres?.length || 0) + 
        (localFilters.ratingStart !== 0 ? 1 : 0) + (localFilters.ratingFinish !== 10 ? 1 : 0) +
        (localFilters.yearStart !== 1990 ? 1 : 0) + (localFilters.yearFinish !== new Date().getFullYear() ? 1 : 0);

    const styles = {
        container: {
            backgroundColor: '#fff',
            borderRadius: '12px',
            marginBottom: '16px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e0e0e0',
        },
        header: {
            padding: '14px 16px',
            borderBottom: '1px solid #f0f0f0',
            fontWeight: 600,
            fontSize: '15px',
            color: '#666',
            backgroundColor: '#fafafa',
        },
        button: {
            width: '100%',
            padding: '12px 16px',
            fontSize: '15px',
            fontWeight: 500,
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: 'inherit',
        },
        buttonPrimary: {
            backgroundColor: '#0077FF',
            color: '#fff',
        },
        buttonOutline: {
            backgroundColor: 'transparent',
            border: '1px solid #0077FF',
            color: '#0077FF',
        },
        buttonSecondary: {
            backgroundColor: '#f5f5f5',
            color: '#333',
            border: '1px solid #ddd',
        },
        section: {
            padding: '16px',
            borderBottom: '1px solid #f0f0f0',
        },
        sectionLast: {
            padding: '16px',
        },
        sectionTitle: {
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '12px',
            color: '#333',
        },
        chipContainer: {
            display: 'flex',
            flexWrap: 'wrap' as const,
            gap: '8px',
        },
        chip: {
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            border: '1px solid #ddd',
            backgroundColor: '#fff',
            color: '#333',
        },
        chipActive: {
            backgroundColor: '#0077FF',
            borderColor: '#0077FF',
            color: '#fff',
        },
        sliderContainer: {
            marginTop: '8px',
        },
        slider: {
            width: '100%',
            margin: '8px 0',
            height: '4px',
            borderRadius: '2px',
            background: '#e0e0e0',
            outline: 'none',
            WebkitAppearance: 'none' as const,
        },
        sliderLabel: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#999',
            marginTop: '4px',
        },
        rangeContainer: {
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
        },
        rangeInput: {
            flex: 1,
        },
        valueDisplay: {
            fontSize: '13px',
            fontWeight: 500,
            color: '#0077FF',
            minWidth: '45px',
            textAlign: 'center' as const,
        },
        buttonsContainer: {
            display: 'flex',
            gap: '12px',
            padding: '16px',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>Фильтры</div>
            
            <div style={{ padding: '16px' }}>
                <button
                    style={{
                        ...styles.button,
                        ...(expanded ? styles.buttonPrimary : styles.buttonOutline)
                    }}
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? 'Скрыть фильтры' : `Показать фильтры ${activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}`}
                </button>
            </div>
            
            {expanded && (
                <>
                    <div style={styles.section}>
                        <div style={styles.sectionTitle}>Жанры</div>
                        <div style={styles.chipContainer}>
                            {GENRES.map(genre => (
                                <div key={genre}
                                    style={{
                                        ...styles.chip,
                                        ...(localFilters.genres?.includes(genre) ? styles.chipActive : {})
                                    }}
                                    onClick={() => handleGenreToggle(genre)}>
                                    {genre}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={styles.section}>
                        <div style={styles.sectionTitle}>
                            Рейтинг: {localFilters.ratingStart || 0} - {localFilters.ratingFinish || 10}
                        </div>
                        <div style={styles.rangeContainer}>
                            <div style={styles.rangeInput}>
                                <input type="range" min="0" max="10" step="0.5" value={localFilters.ratingStart || 0}
                                    onChange={(e) => {
                                        const newStart = parseFloat(e.target.value);
                                        const newFinish = localFilters.ratingFinish || 10;
                                        setLocalFilters({
                                            ...localFilters,
                                            ratingStart: newStart,
                                            ratingFinish: newFinish < newStart ? newStart : newFinish
                                        });
                                    }}
                                    style={styles.slider}/>
                            </div>
                            <div style={styles.rangeInput}>
                                <input type="range" min="0" max="10" step="0.5" value={localFilters.ratingFinish || 10}
                                    onChange={(e) => {
                                        const newFinish = parseFloat(e.target.value);
                                        const newStart = localFilters.ratingStart || 0;
                                        setLocalFilters({
                                            ...localFilters,
                                            ratingFinish: newFinish,
                                            ratingStart: newFinish < newStart ? newFinish : newStart
                                        });
                                    }}
                                    style={styles.slider}/>
                            </div>
                        </div>
                        <div style={styles.sliderLabel}>
                            <span>0</span>
                            <span>2</span>
                            <span>4</span>
                            <span>6</span>
                            <span>8</span>
                            <span>10</span>
                        </div>
                    </div>

                    <div style={styles.section}>
                        <div style={styles.sectionTitle}>
                            Год выпуска: {localFilters.yearStart || 1990} - {localFilters.yearFinish || new Date().getFullYear()}
                        </div>
                        <div style={styles.rangeContainer}>
                            <div style={styles.rangeInput}>
                                <input type="range" min="1990" max={new Date().getFullYear()} step="1" value={localFilters.yearStart || 1990}
                                    onChange={(e) => {
                                        const newStart = parseInt(e.target.value);
                                        const newFinish = localFilters.yearFinish || new Date().getFullYear();
                                        setLocalFilters({
                                            ...localFilters,
                                            yearStart: newStart,
                                            yearFinish: newFinish < newStart ? newStart : newFinish
                                        });
                                    }}
                                    style={styles.slider}/>
                            </div>
                            <div style={styles.rangeInput}>
                                <input type="range" min="1990" max={new Date().getFullYear()} step="1" value={localFilters.yearFinish || new Date().getFullYear()}
                                    onChange={(e) => {
                                        const newFinish = parseInt(e.target.value);
                                        const newStart = localFilters.yearStart || 1990;
                                        setLocalFilters({
                                            ...localFilters,
                                            yearFinish: newFinish,
                                            yearStart: newFinish < newStart ? newFinish : newStart
                                        });
                                    }}
                                    style={styles.slider}/>
                            </div>
                        </div>
                        <div style={styles.sliderLabel}>
                            <span>1990</span>
                            <span>2000</span>
                            <span>2010</span>
                            <span>{new Date().getFullYear()}</span>
                        </div>
                    </div>

                    <div style={styles.buttonsContainer}>
                        <button
                            style={{
                                ...styles.button,
                                ...styles.buttonPrimary,
                                flex: 1
                            }}
                            onClick={handleApply}>
                            Применить
                        </button>
                        <button
                            style={{
                                ...styles.button,
                                ...styles.buttonSecondary,
                                flex: 1
                            }}
                            onClick={handleReset}>
                            Сбросить
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
import React from 'react';
import { Movie } from '../types';

interface FavoritesModalProps {
    open: boolean;
    movie: Movie | null;
    onConfirm: () => void;
    onCancel: () => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
    open,
    movie,
    onConfirm,
    onCancel,
    }) => {

    if (!open) return null;

    console.log('   → модальное окно открыто');

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
        }}>
            <div style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                maxWidth: '400px',
                width: '90%',
                padding: '24px',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}>
                <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 'bold' }}>
                    Добавить в избранное?
                </h2>
                <p style={{ marginBottom: '24px', color: '#666' }}>
                    {movie?.name}
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={onCancel}
                        style={{
                            flex: 1,
                            padding: '12px',
                            backgroundColor: '#f0f0f0',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '16px',
                        }}>
                        Отмена
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{
                            flex: 1,
                            padding: '12px',
                            backgroundColor: '#0077FF',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                        }}>
                        Добавить
                    </button>
                </div>
            </div>
        </div>
    );
};
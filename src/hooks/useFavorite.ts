import { useUnit } from 'effector-react';
import { $showModal, $waitMovie, $storage, appendFavorite, deleteFavorite, openModal, closeModal } from '../store/favoriteStorage';
import { Movie } from '../types';

export const useFavorite = () => {
    const storage = useUnit($storage);
    const showModal = useUnit($showModal);
    const waitMovie = useUnit($waitMovie);

    const appendFavoriteMovie = (movie: Movie) => {
        openModal(movie);
    };

    const confirmAppend = () => {
        if (waitMovie) {
            appendFavorite(waitMovie);
        };
        closeModal(); 
    };

    const cancelAppend = () => {
        closeModal();
    };

    const isFavorite = (id: number) => {
        return storage.some(elem => elem.id === id);
    };

    return { storage, addFavorite: appendFavoriteMovie, deleteFavorite, showModal,
             confirmAppend, cancelAppend, waitMovie, isFavorite };
}
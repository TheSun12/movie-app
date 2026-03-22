import { createEvent, createStore } from 'effector';
import { Movie } from '../types';

const loadFavorite = (): Movie[] => {
    const stored = localStorage.getItem('storage');
    return stored ? JSON.parse(stored) : [];
}

export const $storage = createStore<Movie[]>(loadFavorite());
export const appendFavorite = createEvent<Movie>();
export const deleteFavorite = createEvent<number>();

export const $showModal = createStore<boolean>(false);
export const $waitMovie = createStore<Movie | null>(null);
export const openModal = createEvent<Movie>();
export const closeModal = createEvent();

$storage
    .on(appendFavorite, (state, movie) => {
        if (!state.some(elem => elem.id === movie.id)) {
            const newState = [...state, movie];
            localStorage.setItem('storage', JSON.stringify(newState));
            return newState;
        };
        return state;
    })

    .on(deleteFavorite, (state, id) => {
        const newState = state.filter(elem => elem.id !== id);
        localStorage.setItem('storage', JSON.stringify(newState));
        return newState;
    });

$showModal
  .on(openModal, () => true)
  .on(closeModal, () => false);

$waitMovie
  .on(openModal, (_, movie) => movie)
  .on(closeModal, () => null);
import { createEvent, createStore } from 'effector';
import { Movie } from '../types';

export const $storage = createStore<Movie[]>([]);
export const appendMovie = createEvent<Movie>();
export const deleteMovie = createEvent<number>();
export const clearStorage = createEvent();

$storage
    .on(appendMovie, (state, movie) => {
        if (state.some(elem => elem.id === movie.id)) {
            return state;
        }
        
        const newState = [...state, movie];
        
        if (newState.length > 2) {
            const removed = newState.shift();
        }
        
        return newState;
    })

    .on(deleteMovie, (state, id) => {
        const newState = state.filter(m => m.id !== id);
        return newState;
    })

    .on(clearStorage, () => {
        return [];
    })
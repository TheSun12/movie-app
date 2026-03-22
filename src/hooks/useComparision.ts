import { useUnit } from 'effector-react';
import { $storage, appendMovie, deleteMovie, clearStorage } from '../store/comparisionStorage';
import { Movie } from '../types';

export const useCompare = () => {
    const compare = useUnit($storage);

    const isComparing = (id: number): boolean => {
        const result = compare.some(movie => movie.id === id);
        return result;
    };
    
    const appendCompare = (movie: Movie): void => {
        appendMovie(movie);
    };
    
    const deleteFromCompare = (id: number): void => {
        deleteMovie(id);
    };
    
    const clearAllCompare = (): void => {
        clearStorage();
    };
    
    const compareCount = compare.length;
    const canAddMore = compare.length < 2;
    const compareList = compare;
    
    return { compare, compareCount, canAddMore, compareList, isComparing,
             appendCompare, deleteFromCompare, clearAllCompare };
};
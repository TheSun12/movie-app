import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { MoviePage } from './pages/MoviePage';
import { FavoritesPage } from './pages/FavoritePage';
import { ComparePage } from './pages/ComparisionPage';
import { useFavorite } from './hooks/useFavorite';
import { FavoritesModal } from './components/Favorite';

function App() {
    const { showModal, waitMovie, confirmAppend, cancelAppend } = useFavorite();
    
    return (
        <div style={{ minHeight: '100vh' }}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/movie/:id" element={<MoviePage />} />
                        <Route path="/favorites" element={<FavoritesPage />} />
                        <Route path="/compare" element={<ComparePage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Layout>
                <FavoritesModal
                    open={showModal}
                    movie={waitMovie}
                    onConfirm={confirmAppend}
                    onCancel={cancelAppend}
                />
            </BrowserRouter>
        </div>
    );
}

export default App;
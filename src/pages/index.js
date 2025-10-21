import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import AllMovies from '../components/AllMovies';
import WatchedMovies from '../components/WatchedMovies';
import NotWatchedMovies from '../components/NotWatchedMovies';
import MoviesByRating from '../components/MoviesByRating';
import AddMovie from '../components/AddMovie';
import EditMovie from '../components/EditMovie';

import {
  loadMoviesAPI,
  loadWatchedMoviesAPI,
  loadUnwatchedMoviesAPI,
  loadMoviesByRatingAPI,
  addMovieAPI,
  editMovieAPI,
  deleteMovieAPI,
} from '../services/api';

function NavButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded ${active ? 'bg-indigo-600 text-white' : 'border'}`}
    >
      {children}
    </button>
  );
}

export default function Home() {
  const [view, setView] = useState('all');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  const [ratingOrder, setRatingOrder] = useState('desc');

  async function fetchMovies() {
    try {
      setLoading(true);
      setError(null);
      let data = [];
      if (view === 'all') data = await loadMoviesAPI();
      else if (view === 'watched') data = await loadWatchedMoviesAPI();
      else if (view === 'unwatched') data = await loadUnwatchedMoviesAPI();
      else if (view === 'rating') data = await loadMoviesByRatingAPI(ratingOrder);

      setMovies(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setError(error.message || 'Error loading movies');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, [view, ratingOrder]);

  const handleAdd = async (movie) => {
    try {
      await addMovieAPI(movie);
      setShowAdd(false);
      fetchMovies();
    } catch (error) {
      alert(error.message || 'Error adding movie');
    }
  };

  const handleEdit = async (id, movie) => {
    try {
      await editMovieAPI(id, movie);
      setShowEdit(false);
      setEditingMovie(null);
      fetchMovies();
    } catch (error) {
      alert(error.message || 'Error updating movie');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this movie?')) return;
    try {
      await deleteMovieAPI(id);
      setMovies((prev) => prev.filter((m) => m._id !== id));
    } catch (error) {
      alert(error.message || 'Error deleting movie');
    }
  };

  const handleEditOpen = (movie) => {
    setEditingMovie(movie);
    setShowEdit(true);
  };

  const handleSortChange = (order) => {
    setRatingOrder(order);
  };

return (
  <div
    className="min-h-screen p-4 sm:p-8 bg-cover bg-center"
    style={{ backgroundImage: 'url(/background.jpg)' }}
  >
    <Head>
      <title>Movie Watchlist</title>
    </Head>

    <header className="fixed top-0 left-0 right-0 z-20 bg-zinc-800  backdrop-blur-md shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl text-white sm:text-3xl font-bold">🎬Movie Watchlist</h1>
      <button
        className="px-3 py-1 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
        onClick={() => setShowAdd(true)}
      >
        + Add Movie
      </button>
    </header>

    <div className="max-w-3xl mx-auto bg-white opacity-97 p-6 rounded-lg shadow-lg mt-28">
      <nav className="flex gap-2 mb-6 flex-wrap">
        <NavButton active={view === 'all'} onClick={() => setView('all')}>All</NavButton>
        <NavButton active={view === 'watched'} onClick={() => setView('watched')}>Watched</NavButton>
        <NavButton active={view === 'unwatched'} onClick={() => setView('unwatched')}>Not Watched</NavButton>
        <NavButton active={view === 'rating'} onClick={() => setView('rating')}>Order by Rating</NavButton>
      </nav>

        <main>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : movies.length === 0 ? (
            <div className="text-center py-8 text-gray-600">No movies found.</div>
          ) : (
            <div>
              {view === 'all' && (
                <AllMovies movies={movies} onEdit={handleEditOpen} onDeleted={(id) => setMovies((prev) => prev.filter((m) => m._id !== id))} />
              )}

              {view === 'watched' && (
                <WatchedMovies movies={movies} onEdit={handleEditOpen} onDeleted={(id) => setMovies((prev) => prev.filter((m) => m._id !== id))} />
              )}

              {view === 'unwatched' && (
                <NotWatchedMovies movies={movies} onEdit={handleEditOpen} onDeleted={(id) => setMovies((prev) => prev.filter((m) => m._id !== id))} />
              )}

              {view === 'rating' && (
                <MoviesByRating movies={movies} onEdit={handleEditOpen} onDeleted={(id) => setMovies((prev) => prev.filter((m) => m._id !== id))} onSortChange={handleSortChange} />
              )}
            </div>
          )}
        </main>

        <footer className="text-center text-sm text-gray-400 mt-4">
          Tip: use the buttons above to filter and order movies.
        </footer>
      </div>

      {showAdd && <AddMovie onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
      {showEdit && <EditMovie movie={editingMovie} onClose={() => setShowEdit(false)} onSave={handleEdit} />}
    </div>
  );
}

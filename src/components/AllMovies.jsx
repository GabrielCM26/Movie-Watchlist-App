import React from 'react';
import { deleteMovieAPI } from '../services/api';


export default function AllMovies({ movies, onEdit, onDeleted }) {
    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this movie?')) return;
        try {
            await deleteMovieAPI(id);
            onDeleted(id);
        } catch (error) {
            alert(error.message || 'Error deleting movie');
        }
    };


    return (
        <ul className="space-y-3">
            {movies.map((movie) => (
                <li key={movie._id} className="flex items-center justify-between gap-4 p-3 rounded-md shadow-md">

                    <div>
                        <div className="flex items-baseline gap-3">
                            <h3 className="font-semibold">{movie.title}</h3>
                            <span className="text-sm text-gray-500">({movie.year})</span>
                        </div>
                        <div className="text-sm text-gray-500">{movie.genre}</div>
                        <div className="text-sm mt-1">
                            Rating: <strong>{movie.rating ?? '-'}</strong>
                            {' • '}
                            {movie.watched ? (
                                <span className="text-green-600">Watched</span>
                            ) : (
                                <span className="text-orange-600">Not watched</span>
                            )}
                        </div>
                        <p className="text-xs text-gray-500">
                            Added: {movie.createdAt ? new Date(movie.createdAt).toLocaleDateString() : ''}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            className="px-3 py-1 border rounded text-sm cursor-pointer"
                            onClick={() => onEdit(movie)}
                        >
                            Edit
                        </button>
                        <button
                            className="px-3 py-1 bg-red-500 text-white rounded text-sm cursor-pointer"
                            onClick={() => handleDelete(movie._id)}
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
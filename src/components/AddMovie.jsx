import React, { useState } from 'react';

export default function AddMovie({ onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [watched, setWatched] = useState(false);
  const [rating, setRating] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !year || !genre) {
      alert('Title, year and genre are required');
      return;
    }

    const movie = {
      title,
      year: Number(year),
      genre,
      watched,
      rating: rating ? Number(rating) : undefined,
    };

    onAdd(movie);
  };

  return (
        <ul className="space-y-3">
            {movies.map((movie) => (
                <li key={movie._id} className="flex items-center justify-between gap-4 p-3 border rounded-md">
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
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            className="px-3 py-1 border rounded text-sm"
                            onClick={() => onEdit(movie)}
                        >
                            Edit
                        </button>
                        <button
                            className="px-3 py-1 bg-red-500 text-white rounded text-sm"
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
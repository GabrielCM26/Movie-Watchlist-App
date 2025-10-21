import React, { useState, useEffect } from 'react';

export default function EditMovie({ movie, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [watched, setWatched] = useState(false);
  const [rating, setRating] = useState('');

  useEffect(() => {
    if (movie) {
      setTitle(movie.title || '');
      setYear(movie.year || '');
      setGenre(movie.genre || '');
      setWatched(Boolean(movie.watched));
      setRating(movie.rating ?? '');
    }
  }, [movie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !year || !genre) {
      alert('Title, year and genre are required');
      return;
    }

    const updated = {
      title,
      year: Number(year),
      genre,
      watched,
      rating: rating ? Number(rating) : undefined,
    };

    onSave(movie._id, updated);
  };

  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-3">Edit movie</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm">Title</label>
            <input className="w-full border rounded px-2 py-1" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm">Year</label>
            <input className="w-full border rounded px-2 py-1" value={year} onChange={(e) => setYear(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm">Genre</label>
            <input className="w-full border rounded px-2 py-1" value={genre} onChange={(e) => setGenre(e.target.value)} />
          </div>

          <div className="flex items-center gap-2">
            <input id="watched" type="checkbox" checked={watched} onChange={(e) => setWatched(e.target.checked)} />
            <label htmlFor="watched">Watched</label>
          </div>

          <div>
            <label className="block text-sm">Rating (1-10)</label>
            <input className="w-full border rounded px-2 py-1" value={rating} onChange={(e) => setRating(e.target.value)} type="number" min="1" max="10" />
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button type="button" className="px-3 py-1 border rounded cursor-pointer" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-3 py-1 bg-indigo-600 text-white rounded cursor-pointer">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
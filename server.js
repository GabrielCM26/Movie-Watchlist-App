const express = require('express');
const next = require('next');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./lib/mongodb');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const Movie = require('./models/Movie');

// ===== ENDPOINTS DA API =====

// GET /api/movies - movies list(with filters)
// GET 1 - Get list with every movie
app.get('/api/movies', async (req, res) => {
    try {
        const movies = await Movie.find().exec();
        res.json(movies);
    } catch (error) {
        console.error('Error loading movies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET 2 - Watched movies
app.get('/api/movies/watched', async (req, res) => {
    try {
        const movies = await Movie.find({ watched: true }).exec();
        res.json(movies);
    } catch (error) {
        console.error('Error loading watched movies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET 3 - Unwatched movies
app.get('/api/movies/unwatched', async (req, res) => {
    try {
        const movies = await Movie.find({ watched: false }).exec();
        res.json(movies);
    } catch (error) {
        console.error('Error loading unwatched movies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET 4 - Order by rating
app.get('/api/movies/sorted/rating', async (req, res) => {
    try {
        const { order } = req.query;
        const sortOrder = order === 'asc' ? 1 : -1;

        const movies = await Movie.find().sort({ rating: sortOrder }).exec();
        res.json(movies);
    } catch (error) {
        console.error('Error loading ordered movies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/movies - Add new movie
app.post('/api/movies', async (req, res) => {
    try {
        const { title, year, genre, watched, rating } = req.body;

        if (!title || !genre || !year) {
            return res.status(400).json({ error: 'Title, year and genre are required' });
        }

        const newMovie = new Movie({ title, year, genre, watched, rating });
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (error) {
        console.error('Error creating movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT /api/movies/:id - Edit existing movies
app.put('/api/movies/:id', async (req, res) => {
    try {
        const { title, year, genre, watched, rating } = req.body;
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            { title, year, genre, watched, rating },
            { new: true }
        );
        if (!updatedMovie) return res.status(404).json({ error: 'Movie not found' });
        res.json(updatedMovie);
    } catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE /api/movies/:id - Delete movie
app.delete('/api/movies/:id', async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) return res.status(404).json({ error: 'Movie not found' });
        res.json({ message: 'Movie deleted successfully' });

    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Next.js page handling
app.use((req, res) => {
    return handle(req, res);
});

const PORT = process.env.PORT || 3000;

nextApp.prepare().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor Next.js + Express a correr em http://localhost:${PORT}`);
    });
});
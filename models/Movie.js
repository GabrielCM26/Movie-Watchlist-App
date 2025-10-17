const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    _id: ObjectId,
    title: {type :"string", required: true },
    year: "number",
    genre: "string",
    watched: "boolean",
    rating: "number (1-10)",
    createdAt: "date"
}, {
    versionKey: false
});

module.exports = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
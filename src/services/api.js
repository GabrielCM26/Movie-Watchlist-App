// ========== GET: All Movies ==========
export async function loadMoviesAPI() {
  try {
    const response = await fetch('/api/movies');

    if (!response.ok) throw new Error('Error loading movies');

    return await response.json();
  } catch (error) {
    console.error('Error loading movies:', error);
    throw error;
  }
}

// ========== GET: Watched Movies ==========
export async function loadWatchedMoviesAPI() {
  try {
    const response = await fetch('/api/movies/watched');

    if (!response.ok) throw new Error('Error loading watched movies');

    return await response.json();
  } catch (error) {
    console.error('Error loading watched movies:', error);
    throw error;
  }
}

// ========== GET: Unwatched Movies ==========
export async function loadUnwatchedMoviesAPI() {
  try {
    const response = await fetch('/api/movies/unwatched');

    if (!response.ok) throw new Error('Error loading unwatched movies');

    return await response.json();
  } catch (error) {
    console.error('Error loading unwatched movies:', error);
    throw error;
  }
}

// ========== GET: Movies Sorted by Rating ==========
export async function loadMoviesByRatingAPI(order = 'desc') {
  try {
    const response = await fetch(`/api/movies/sorted/rating?order=${order}`);

    if (!response.ok) throw new Error('Error loading movies by rating');

    return await response.json();
  } catch (error) {
    console.error('Error sorting movies by rating:', error);
    throw error;
  }
}

// ========== POST: Add New Movie ==========
export async function addMovieAPI(movie) {
  try {
    const response = await fetch('/api/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error adding movie');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding movie:', error);
    throw error;
  }
}

// ========== PUT: Edit Movie ==========
export async function editMovieAPI(id, movie) {
  try {
    const response = await fetch(`/api/movies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error updating movie');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating movie:', error);
    throw error;
  }
}

// ========== DELETE: Remove Movie ==========
export async function deleteMovieAPI(id) {
  try {
    const response = await fetch(`/api/movies/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error deleting movie');
    }

    // no JSON to return, server only replies with success message
    return true;
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
}

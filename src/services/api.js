// GET /api/movies - Load every movie
export async function loadMoviesAPI() {
  try {
    const response = await fetch('/api/movies')
    
    if (!response.ok) {
      console.error('Response error:', response.status, response.statusText)
      throw new Error('Error loading movies')
    }
    
    const data = await response.json()
    return data

  } catch (error) {
    console.error('Error loading movies:', error)
    throw error
  }
}

// POST /api/movies - Add new movie
export async function addMovieAPI(movie) {
  try {
    const response = await fetch('/api/movie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ movie })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.erro || 'Error adding movie')
    }
    
    const resultado = await response.json()
    return resultado

  } catch (error) {
    console.error('Error adding movie:', error)
    throw error
  }
}
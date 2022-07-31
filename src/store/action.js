export function updateMovies(movies) {
  return {
    type: 'update',
    payload: movies
  };
}

// export function addMovie(movie) {
//   return {
//     type: 'add',
//     payload: movie,
//   };
// }

// export function editMovie(movie) {
//   return {
//     type: 'edit',
//     payload: movie,
//   };
// }

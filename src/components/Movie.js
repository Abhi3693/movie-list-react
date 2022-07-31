import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateMovies } from '../store/action';
import useFetch from '../customHooks/useFetch';
import { MOVIE_URL } from '../utils/constant';

function Movie(props) {
  const { makeApiCall } = useFetch();

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    let response = await makeApiCall(MOVIE_URL);
    if (response.movies) {
      props.dispatch(updateMovies(response.movies));
    }
  };

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString();
  };

  let movieList = props.state;

  if (props.searchValue) {
    movieList = props.state.filter((movie) => {
      return movie.name
        .toLowerCase()
        .startsWith(props.searchValue.toLowerCase());
    });
  }

  return (
    <div className='container'>
      <ul className='movie-card-holder'>
        {movieList.length ? (
          movieList.map((movie, i) => {
            return (
              <li key={movie.id} className='movie-card'>
                <div className='card' style={{ maxWidth: '100%' }}>
                  <img
                    src={movie.poster}
                    className='card-img-top movie-img'
                    alt={movie.name}
                  />
                  <div className='card-body'>
                    <h3 className='card-title text-info fs-2 fw-bold'>
                      {movie.name}
                    </h3>
                    <h5 className=''>
                      <span className='fw-bold'>Producer: </span>
                      {movie.producer.name ? movie.producer.name : ''}
                    </h5>
                    <h5 className='card-title text-secondary'>
                      <span className='fw-bold'>Date: </span>
                      {formatDate(movie.releaseDate)}
                    </h5>
                    <p className='card-text'>
                      <span className='fw-bold'>Actors: </span>
                      {movie.actors.map((elm) => {
                        return (
                          <span key={elm.id} className='me-4'>
                            {elm.name}
                          </span>
                        );
                      })}
                    </p>
                    <Link to={`/${movie.id}`}>
                      <button className='read-more btn btn-secondary'>
                        Edit Movie
                      </button>
                    </Link>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <h1 className='mt-5'>No movie found</h1>
        )}
      </ul>
    </div>
  );
}

function mapstatetoprops(state) {
  return {
    state,
  };
}

export default connect(mapstatetoprops)(Movie);

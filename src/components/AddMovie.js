import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

import { ALLVALUES_URL, MOVIE_URL } from '../utils/constant';
import useFetch from '../customHooks/useFetch';
import validate from '../utils/validate';
import AddNew from './AddNew';

const INITIAL_FORM_DATA = {
  name: '',
  plot: '',
  poster: '',
  directors: [],
  actors: [],
  producer: '',
  releaseDate: '',
};

const INITIAL_FORM_ERROR = {
  name: '',
  plot: '',
  poster: '',
  directors: '',
  actors: '',
  producer: '',
  releaseDate: '',
  errors: '',
};

const INITIAL_ALL_VALUES = {
  actors: [],
  producers: [],
  directors: [],
};

function AddMovie(props) {
  let navigate = useNavigate();
  let { id } = useParams();
  let [addNew, setAddNew] = useState('');
  const [allValues, setAll] = useState(INITIAL_ALL_VALUES);
  const [formData, setFormData] = useState({ ...INITIAL_FORM_DATA });
  const [formError, setFormErrors] = useState({ ...INITIAL_FORM_ERROR });

  useEffect(() => {
    getAllValues();
    if (id) {
      getMovieToUpdate();
    }
    if (!id) {
      setFormData(INITIAL_FORM_DATA);
    }
  }, [addNew, id]);

  const { makeApiCall } = useFetch();

  const getMovieToUpdate = async () => {
    let result = await makeApiCall(MOVIE_URL + id);
    if (result && result.movie) {
      setFormData(result.movie);
    }
  };

  const getAllValues = async () => {
    let result = await makeApiCall(ALLVALUES_URL);
    if (result && result.all) {
      setAll(result.all);
    }
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    let result = validate(formError, name, value);
    setFormErrors({ ...result });
    setFormData({ ...formData, [name]: value });
  };

  const handleAddActor = (event) => {
    let arr = event.map((elm) => {
      return elm.value;
    });
    setFormData({ ...formData, actors: arr });
  };

  const handleAddDirector = (event) => {
    let arr = event.map((elm) => {
      return elm.value;
    });
    setFormData({ ...formData, directors: arr });
  };

  const handleSubmit = async () => {
    let method = id ? 'PUT' : 'POST';
    let url = id ? MOVIE_URL + id : MOVIE_URL;
    const editInfo = {
      name: formData.name,
      releaseDate: formData.releaseDate,
      plot: formData.plot,
      poster: formData.poster,
      actors: formData.actors,
      directors: formData.directors,
      producer: formData.producer,
    };

    let response = await makeApiCall(
      url,
      method,
      JSON.stringify({ movie: editInfo })
    );
    if (response && response.movie) {
      setFormData(INITIAL_FORM_DATA);
      navigate('/');
    } else {
      if (typeof response.errors === 'string') {
        setFormErrors({ ...formError, errors: response.errors });
      } else {
        setFormErrors(response.errors);
      }
    }
  };

  const handleAddNew = (val) => {
    setAddNew(val);
  };

  const handleRemove = () => {
    setAddNew('');
  };

  const createOptions = (arr) => {
    return arr.map((elm) => {
      return { value: elm._id, label: elm.name };
    });
  };

  const actorsOptions = createOptions([...allValues.actors]);
  const directorsOptions = createOptions([...allValues.directors]);

  return (
    <div className='add-movie-form'>
      {addNew ? <AddNew handleRemove={handleRemove} value={addNew} /> : ''}
      <div className='form-holder'>
        <h1 className='text-center'>{id ? 'Edit' : 'Add'} Movie</h1>
        <span className='text-danger'>{formError.errors}</span>
        <div className='mb-3'>
          <label className='form-label'>Movie Name</label>
          <input
            type='text'
            className='form-control'
            id='exampleFormControlInput1'
            placeholder='Enter movie name'
            onChange={handleChange}
            name='name'
            value={formData.name}
          />
          <span className='text-danger'>{formError.name}</span>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Release Date</label>
          <input
            type='date'
            className='form-control'
            id='exampleFormControlInput1 2'
            placeholder='Enter Release date'
            onChange={handleChange}
            name='releaseDate'
            value={formData.releaseDate}
          />
          <span className='text-danger'>{formError.releaseDate}</span>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Poster</label>
          <input
            type='text'
            className='form-control'
            id='exampleFormControlInput1 5'
            placeholder='Enter movie poster'
            onChange={handleChange}
            name='poster'
            value={formData.poster}
          />
          <span className='text-danger'>{formError.poster}</span>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Plot</label>
          <input
            type='text'
            className='form-control'
            id='exampleFormControlInput1 6'
            placeholder='Enter movie plot'
            onChange={handleChange}
            name='plot'
            value={formData.plot}
          />
          <span className='text-danger'>{formError.plot}</span>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Producer</label>
          <select
            className='form-select'
            placeholder='Select producer from list'
            aria-label='Default select example'
            name='producer'
            onChange={handleChange}
          >
            {id ? (
              <option defaultValue={formData.producer.id}>
                {formData.producerInfo ? formData.producerInfo.name : ''}
              </option>
            ) : (
              ''
            )}
            {allValues.producers.map((producer) => {
              return (
                <option key={producer._id} value={producer._id}>
                  {producer.name}
                </option>
              );
            })}
          </select>
          <span className='text-danger'>{formError.producer}</span>
          <button
            className='btn btn-primary mt-2 d-block'
            onClick={() => handleAddNew('producer')}
          >
            Add new Producer
          </button>
        </div>

        <div className='mb-3'>
          <label className='form-label'>Directors</label>
          <Select
            options={directorsOptions}
            // defaultValue={directorsOptions}
            placeholder='Select directors from list'
            isMulti
            name='directors'
            className='basic-multi-select'
            classNamePrefix='select'
            onChange={handleAddDirector}
          />
          <span className='text-danger'>{formError.directors}</span>
          <button
            className='btn btn-primary mt-2 d-block'
            onClick={() => handleAddNew('director')}
          >
            Add new Director
          </button>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Actors</label>
          <Select
            placeholder='Select actors from list'
            options={actorsOptions}
            // defaultValue={}
            isMulti
            name='actors'
            className='basic-multi-select'
            classNamePrefix='select'
            onChange={handleAddActor}
          />
          <span className='text-danger'>{formError.actors}</span>
          <button
            className='btn btn-primary mt-2 d-block'
            onClick={() => handleAddNew('actor')}
          >
            Add new Actor
          </button>
        </div>
        <button className='btn btn-success' onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddMovie;

import React, { useState } from 'react';

import { ROOT_URL } from '../utils/constant';
import useFetch from '../customHooks/useFetch';
import validateActor from '../utils/validateActor';

const INITIAL_FORM_DATA = {
  name: '',
  gender: '',
  dob: '',
  bio: '',
};

const INITIAL_FORM_ERROR = {
  name: '',
  gender: '',
  dob: '',
  bio: '',
  errors: '',
};

function AddNew(props) {
  const [formData, setFormData] = useState({ ...INITIAL_FORM_DATA });
  const [formError, setFormErrors] = useState({ ...INITIAL_FORM_ERROR });

  const { makeApiCall } = useFetch();

  const handleChange = (event) => {
    let { name, value } = event.target;
    let result = validateActor(formError, name, value);
    setFormErrors({ ...result });
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    let value = props.value;
    let { name, gender, dob, bio } = formData;

    let response = await makeApiCall(
      ROOT_URL + value,
      'POST',
      JSON.stringify({ [value]: { name, gender, dob, bio } })
    );
    if (response[props.value]) {
      props.handleRemove();
    } else {
      if (typeof response.errors === 'string') {
        setFormErrors({ ...formError, errors: response.errors });
      } else {
        setFormErrors(response.errors);
      }
    }
  };

  return (
    <div className='add-new-form'>
      <div className='form-holder'>
        <div className='position-relative'>
          <h1 className='text-center text-light'>Add New {props.value}</h1>
          <span className='cross' onClick={props.handleRemove}>
            x
          </span>
        </div>
        <span className='text-danger'>{formError.errors}</span>
        <div className='mb-3'>
          <label className='form-label text-light'>Name</label>
          <input
            type='text'
            className='form-control'
            placeholder='Enter your Username'
            onChange={handleChange}
            name='name'
            value={formData.name}
          />
          <span className='text-danger'>{formError.name}</span>
        </div>
        <div className='mb-3'>
          <label className='form-label text-light'>Gender</label>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='gender'
              id='exampleRadios1'
              value='Male'
              onChange={handleChange}
            />
            <label
              className='form-check-label text-light'
              htmlFor='exampleRadios1'
            >
              Male
            </label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='gender'
              id='exampleRadios2'
              value='Female'
              onChange={handleChange}
            />
            <label
              className='form-check-label text-light'
              htmlFor='exampleRadios2'
            >
              Female
            </label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='gender'
              id='exampleRadios2'
              value='Other'
              onChange={handleChange}
            />
            <label
              className='form-check-label text-light'
              htmlFor='exampleRadios2'
            >
              Other
            </label>
          </div>
        </div>
        <div className='mb-3'>
          <label className='form-label text-light'>Date of Birth</label>
          <input
            type='date'
            className='form-control'
            placeholder='Enter your password'
            onChange={handleChange}
            name='dob'
            value={formData.password}
          />
          <span className='text-danger'>{formError.dob}</span>
        </div>
        <div className='mb-3'>
          <label className='form-label text-light'>Bio</label>
          <input
            type='text'
            className='form-control'
            placeholder='Enter your password'
            onChange={handleChange}
            name='bio'
            value={formData.password}
          />
          <span className='text-danger'>{formError.bio}</span>
        </div>
        <button className='btn btn-success' onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddNew;

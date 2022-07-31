import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { LOGIN_URL } from '../utils/constant';
import validate from '../utils/validate';
import useFetch from '../customHooks/useFetch';

let schema = yup.object().shape({
  email: yup.string().required('Email required').email('Enter valid email'),
  password: yup
    .string()
    .required('Password required')
    .min(3, 'Password should be of 3 charachter'),
});

const INITIAL_FORM_DATA = {
  email: '',
  password: '',
  errors: '',
};

const INITIAL_FORM_ERROR = {
  email: '',
  password: '',
};

function Login(props) {
  let navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [formError, setFormErrors] = useState(INITIAL_FORM_ERROR);

  const { makeApiCall } = useFetch();

  const performValidation = (successCallback = null) => {
    schema
      .validate(formData, { abortEarly: false })
      .then((values) => {
        setFormErrors(INITIAL_FORM_ERROR);
        if (successCallback) {
          successCallback(values);
        }
      })
      .catch((err) => {
        const errors = {};
        err.inner.forEach((e) => {
          if (!errors[e.path]) {
            errors[e.path] = e.errors[0];
          }
        });
        setFormErrors(errors);
      });
  };

  const handleLogin = async (url, method, body) => {
    let response = await makeApiCall(url, method, body);
    if (response.errors) {
      setFormData({ ...formData, errors: response.errors });
    } else {
      props.updateUser(response.user);
      setFormData(INITIAL_FORM_DATA);
      setFormErrors(INITIAL_FORM_ERROR);
      navigate('/');
    }
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    let result = validate(formError, name, value);
    setFormErrors({ ...result });
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    performValidation(handleSubmit);
  };

  const handleSubmit = (values) => {
    let { email, password } = values;
    handleLogin(
      LOGIN_URL,
      'POST',
      JSON.stringify({ user: { email, password } })
    );
  };

  return (
    <div className='form-holder'>
      <h1 className='text-center'>Login User</h1>
      <span className='text-danger'>{formData.errors}</span>
      <div className='mb-3'>
        <label htmlFor='exampleFormControlInput1 2' className='form-label'>
          Email
        </label>
        <input
          type='email'
          className='form-control'
          id='exampleFormControlInput1 2'
          placeholder='Enter your email'
          onChange={handleChange}
          name='email'
          value={formData.email}
        />
        <span className='text-danger'>{formError.email}</span>
      </div>
      <div className='mb-3'>
        <label htmlFor='exampleFormControlInput1 3' className='form-label'>
          Password
        </label>
        <input
          type='password'
          className='form-control'
          id='exampleFormControlInput1 3'
          placeholder='Enter your password'
          onChange={handleChange}
          name='password'
          value={formData.password}
        />
        <span className='text-danger'>{formError.password}</span>
      </div>
      <button className='btn btn-success' onClick={validateForm}>
        Submit
      </button>
    </div>
  );
}

export default Login;

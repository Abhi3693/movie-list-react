import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';

import Login from './Login';
import Register from './Register';
import Movie from './Movie';
import Header from './Header';
import store from '../store';
import NotFound from './NotFound';
import LoginUserContext from '../contextAPI/LoginUserContext';
import { localStorageKey, LOGIN_URL } from '../utils/constant';
import useFetch from '../customHooks/useFetch';
import AddMovie from './AddMovie';

const INITIAL_USER_INFO = {
  isUserLoggedIn: false,
  user: null,
  error: '',
};

function App() {
  let navigate = useNavigate();

  let [userInfo, setUserInfo] = useState(INITIAL_USER_INFO);
  let [searchValue, setSearchValue] = useState('');
  let { makeApiCall } = useFetch();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let response = await makeApiCall(LOGIN_URL);
    if (response && response.user) {
      updateUser(response.user);
    } else {
      logoutUser();
    }
  };

  const updateUser = (user) => {
    setUserInfo({
      ...userInfo,
      isUserLoggedIn: true,
      user,
    });
    localStorage.setItem(localStorageKey, user.token);
  };

  const logoutUser = () => {
    setUserInfo({
      ...userInfo,
      isUserLoggedIn: false,
      user: null,
    });
    localStorage.removeItem(localStorageKey);
    navigate('/');
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <Provider store={store}>
      <LoginUserContext.Provider value={userInfo}>
        <Header
          updateUser={updateUser}
          logoutUser={logoutUser}
          searchValue={searchValue}
          handleSearch={handleSearch}
        />
        <div className='bg-gray main'>
          <Routes>
            <Route path='/' element={<Movie searchValue={searchValue} />} />
            <Route path='/login' element={<Login updateUser={updateUser} />} />
            <Route
              path='/register'
              element={<Register updateUser={updateUser} />}
            />
            <Route path='/add-movie' element={<AddMovie />} />
            <Route path='/:id' element={<AddMovie />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </LoginUserContext.Provider>
    </Provider>
  );
}

export default App;

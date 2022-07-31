import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

import LoginUserContext from '../contextAPI/LoginUserContext';

function Header(props) {
  let userContext = useContext(LoginUserContext);
  return (
    <div className='bg-dark'>
      <div className='container'>
        {userContext.isUserLoggedIn ? (
          <AuthorizedHeader
            logoutUser={props.logoutUser}
            user={userContext.user}
            handleSearch={props.handleSearch}
            searchValue={props.searchValue}
          />
        ) : (
          <UnauthorizedHeader />
        )}
      </div>
    </div>
  );
}

function AuthorizedHeader(props) {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark'>
      <div className='container-fluid'>
        <Link to='/' className='navbar-brand fw-bold text-warning'>
          Movie-List
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse justify-content-between align-items-center'
          id='navbarSupportedContent'
        >
          <form className='d-flex w-50' role='search'>
            <input
              className='form-control ms-5'
              type='search'
              placeholder='Search Movie by name'
              aria-label='Search'
              required
              value={props.searchValue}
              onChange={props.handleSearch}
            />
          </form>
          <ul className='d-flex justify-content-between align-items-center header-list gap-4 mt-2'>
            <li className='nav-item'>
              <NavLink
                to='/add-movie'
                className={({ isActive }) =>
                  isActive ? 'text-white' : 'text-secondary'
                }
              >
                Add Movie
              </NavLink>
            </li>
            <li className='nav-item'>
              <span to='/add-movie' className='nav-link text-primary'>
                <FaUserCircle /> {props.user.name}
              </span>
            </li>
            <li className='nav-item'>
              <span className='btn btn-danger' onClick={props.logoutUser}>
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function UnauthorizedHeader(props) {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark'>
      <div className='container d-flex justify-content-between align-items-center'>
        <Link to='/' className='navbar-brand fw-bold text-warning'>
          Movie-List
        </Link>
        <ul className='d-flex justify-content-between align-items-center header-list gap-4 mt-2'>
          <li className=''>
            <Link to='/login' className='btn btn-success'>
              Login
            </Link>
          </li>
          <li className=''>
            <Link to='/register' className='btn btn-success'>
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;

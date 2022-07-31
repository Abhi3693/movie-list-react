import {createStore} from 'redux';

function reducer(state = [], action) {
  switch (action.type) {
    case 'update':
      state = action.payload;
      return state;
  
    default:
      return state;
  }
}

let store = createStore(reducer);

export default store;
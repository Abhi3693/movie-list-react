import { useState } from 'react';
import { localStorageKey } from '../utils/constant';

function useFetch() {
  const [isLoading, setIsLoading] = useState(true);
  let storageKey = localStorage[localStorageKey];

  const headers = { 
    authorization: storageKey || "",
    'Content-Type': 'application/json'
  };

  function makeApiCall(url, method = 'GET', body = null) {

    return fetch(url, {
      method: method,
      headers: headers,
      body: body,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then(({ errors }) => {
          return Promise.reject(errors);
        });
      })
      .then((data) => {
        setIsLoading(false);
        return data;
      })
      .catch((errors) => {
        setIsLoading(false);
        return { errors };
      });
  }

  return {
    makeApiCall,
    isLoading,
  };
}

export default useFetch;
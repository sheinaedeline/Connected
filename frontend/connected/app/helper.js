import axios from "axios";

export function apiCall (url, method, body = {}, queryString = null) {
  const path = `http://localhost:3000/${url}${queryString !== null ? `?${queryString}` : ''}`; // Build the URL String or in this case the api route
  const loggedUser = localStorage.getItem('loggedUser');
  const state = JSON.parse(loggedUser);
  const token = state.jwtToken; // Get the user authorization token from the local storage
  const config = {
    ...(token !== null && { headers: { Authorization: `Bearer ${token}` } })
  };
  if (method === 'POST') {
    return axios.post(
      path,
      body,
      config
    )
  } else if (method === 'GET') {
    return axios.get(path, config)
  } else if (method === 'DELETE') {
    return axios.delete(path, config)
  } else if (method === 'PUT') {
    return axios.put(path, body, config)
  }
};
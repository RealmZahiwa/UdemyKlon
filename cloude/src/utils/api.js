import axios from 'axios';

const API_BASE_URL = 'https://66e7235817055714e58b908b.mockapi.io';

export const getUsers = () => {
  return axios.get(`${API_BASE_URL}/users`);
};

export const getCourses = () => {
  return axios.get(`${API_BASE_URL}/courses`);
};

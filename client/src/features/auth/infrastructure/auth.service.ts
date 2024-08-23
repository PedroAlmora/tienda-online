import axios from 'axios';

const API_URL = 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const login = (username: string, password: string) => {
  return axiosInstance.post('/auth/login', { username, password });
};

const register = (username: string, password: string, firstName: string, lastName: string, email: string) => {
  return axiosInstance.post('/users', {
    username,
    password,
    firstName,
    lastName,
    email
  });
};

export { login, register };
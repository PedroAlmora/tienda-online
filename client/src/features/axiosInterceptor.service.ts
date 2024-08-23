import axios from 'axios';

const baseURL = process.env.API_URL;

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Aquí puedes agregar lógica para modificar la configuración de la solicitud antes de enviarla
    // Por ejemplo, agregar encabezados de autenticación
    // config.headers['Authorization'] = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta para manejar errores comunes
axiosInstance.interceptors.response.use(
  (response) => {
    // Aquí puedes agregar lógica para manejar la respuesta antes de que se entregue a la aplicación
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
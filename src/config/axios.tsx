

import axios from "axios";

// Configuration d'Axios
const api = axios.create({
  baseURL: "http://localhost:5050",
  withCredentials: true,
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("Access token expiré, tentative de rafraîchissement...");

    
        const refreshResponse = await axios.post(
          "http://localhost:5050/user/refresh-token",
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.accessToken;
        console.log("Nouveau token reçu :", newAccessToken);


        document.cookie = `accessToken=${newAccessToken}  ; path=/; Secure `;


        originalRequest.headers["Authorization"] = ` Bearer ${newAccessToken}`;
        return api.request(originalRequest);
      } catch (refreshError) {
        console.error("Échec du rafraîchissement du token, redirection vers login...");
        window.location.href = "/login"; 
      }
    }

    return Promise.reject(error);
  }
);

export default api;


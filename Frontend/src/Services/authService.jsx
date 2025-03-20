import axios from "axios";

const API_URL = "http://localhost:5000/auth";

export const register = async (username, email, password) => {
    return axios.post(`${API_URL}/register`, { username, email, password });
};

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) localStorage.setItem("token", response.data.token);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const getToken = () => {
    return localStorage.getItem("token");
};
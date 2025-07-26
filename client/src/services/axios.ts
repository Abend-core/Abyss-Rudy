import axios, {
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosResponse,
} from "axios";

const api: AxiosInstance = axios.create({
    baseURL: "https://localhost:3000",
    timeout: 10000,
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        console.error("API error:", error);
        return Promise.reject(error);
    }
);

export default api;

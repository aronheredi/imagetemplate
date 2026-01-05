import api from './axios';

export function useApi() {
    // JWT token is automatically added by axios interceptors
    return api;
}

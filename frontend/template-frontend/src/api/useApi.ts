
import { useAuth0 } from '@auth0/auth0-react';
import api from './axios';

export function useApi() {
    const { getAccessTokenSilently } = useAuth0();

    api.interceptors.request.use(async (config) => {
        const token = await getAccessTokenSilently();
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });

    return api;
}

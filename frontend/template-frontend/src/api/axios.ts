import axios, { AxiosHeaders } from "axios";
import { useAuthStore } from "@/stores/auth-store";

const api = axios.create({
    baseURL: (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
    (config) => {
        // Prefer token from zustand store (available immediately after login)
        const storeToken = useAuthStore.getState().token;

        // Fallback to token from localStorage (e.g., after refresh)
        let token = storeToken;
        if (!token) {
            const authStorage = localStorage.getItem('auth-storage');
            if (authStorage) {
                try {
                    const parsed = JSON.parse(authStorage);
                    token = parsed?.state?.token ?? null;
                } catch (error) {
                    console.error('Error parsing auth storage:', error);
                }
            }
        }

        if (token) {
            if (!config.headers) {
                config.headers = new AxiosHeaders();
            }

            if (typeof (config.headers as AxiosHeaders).set === 'function') {
                (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
            } else {
                (config.headers as AxiosHeaders).Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const url: string = error?.config?.url ?? '';
            const method: string = (error?.config?.method ?? 'get').toUpperCase();

            // Never auto-logout on expected auth failures
            if (url.includes('/auth/login') || url.includes('/auth/register')) {
                return Promise.reject(error);
            }

            // Only auto-logout when the failing request used the CURRENT token.
            // This avoids a stale in-flight request (from an old token) kicking the user back to /auth
            // right after they successfully log in.
            const headers = error?.config?.headers;
            const authHeader =
                (headers && typeof headers.get === 'function' ? headers.get('Authorization') : undefined) ??
                headers?.Authorization ??
                headers?.authorization;

            const tokenFromRequest =
                typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
                    ? authHeader.slice('Bearer '.length)
                    : null;

            const currentToken = useAuthStore.getState().token;

            if (tokenFromRequest && currentToken && tokenFromRequest !== currentToken) {
                console.warn('[api] Ignoring stale 401', { method, url });
                return Promise.reject(error);
            }

            console.warn('[api] 401 -> logout', { method, url });
            useAuthStore.getState().logout();
            localStorage.removeItem('auth-storage');

            if (globalThis.location.pathname !== '/auth') {
                globalThis.location.assign('/auth');
            }
        }
        return Promise.reject(error);
    }
);

export default api;
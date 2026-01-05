import React, { useEffect, useMemo, type ReactNode } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { authService, type LoginDto, type RegisterDto } from '@/api/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './auth-context';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user, token, isAuthenticated, setAuth, logout: clearAuth } = useAuthStore();
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasValidated, setHasValidated] = React.useState(false);
    const navigate = useNavigate();

    const login = async (data: LoginDto) => {
        try {
            setIsLoading(true);
            const response = await authService.login(data);
            setAuth(response.user, response.access_token);
            setHasValidated(true); // Skip validation for fresh login
            //navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: RegisterDto) => {
        try {
            setIsLoading(true);
            const response = await authService.register(data);
            setAuth(response.user, response.access_token);
            setHasValidated(true); // Skip validation for fresh registration
            navigate('/');
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        clearAuth();
        navigate('/auth');
    };

    useEffect(() => {
        const validateToken = async () => {
            if (hasValidated) return; // Skip if already validated (e.g., after fresh login)

            const tokenToValidate = useAuthStore.getState().token;
            const isAuthenticatedToValidate = useAuthStore.getState().isAuthenticated;

            if (tokenToValidate && isAuthenticatedToValidate) {
                try {
                    await authService.getProfile();
                    setHasValidated(true);
                } catch (error) {
                    console.error('Token validation failed:', error);

                    // Only clear auth if the token we validated is still the current one.
                    // Otherwise a successful login may have happened while validation was in-flight.
                    const currentToken = useAuthStore.getState().token;
                    if (currentToken === tokenToValidate) {
                        clearAuth();
                    }
                }
            }
        };

        validateToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const value = useMemo(
        () => ({
            user,
            token,
            isAuthenticated,
            login,
            register,
            logout,
            isLoading,
        }),
        [user, token, isAuthenticated, login, register, logout, isLoading]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

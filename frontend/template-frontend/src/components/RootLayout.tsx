import { Outlet } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';

export const RootLayout = () => {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
};

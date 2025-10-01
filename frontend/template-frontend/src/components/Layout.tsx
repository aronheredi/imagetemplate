import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';

export const Layout = () => {
  return (
    <div className="h-screen bg-gray-900 overflow-hidden">
      <Navigation />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};
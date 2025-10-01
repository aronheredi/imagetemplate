import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-gray-800 shadow-lg">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-xl font-bold text-white">
            React Template
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`rounded px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive('/')
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Canvas
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
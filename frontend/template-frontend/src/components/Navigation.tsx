import api from '@/api/axios';
import { useCanvasStore } from '@/stores/canvas-store';
import type { Canvas } from 'fabric';
import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';


export const Navigation = () => {
  const [isSaving, setIsSaving] = useState(false);
  const location = useLocation();
  const canvas = useCanvasStore((state) => state.canvas);
  const id = useParams().id as string;
  const isActive = (path: string) => location.pathname === path;
  const onSave = async () => {
    if (!canvas) return;
    try {

      setIsSaving(true);
      const json = canvas.toJSON();

      console.log('Saving canvas data...', json);
      const response = await api.patch(`/templates/${id}`, { json });

      if (response.status < 200 || response.status >= 300) {
        throw new Error('Network response was not ok');
      }

    } finally {
      setIsSaving(false);
    }
  };
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white/80 shadow-lg">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-xl font-bold text-white">
            React Template
          </Link>

          <div className="flex space-x-4">
            <button
              onClick={() => onSave()}
              className={`rounded px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive('/')
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
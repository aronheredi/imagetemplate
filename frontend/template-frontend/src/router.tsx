import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components';
import { CanvasPage } from '@/pages';
import { TemplatesPage } from './pages/TemplatesPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <TemplatesPage />,
      },
      {
        path: 'canvas/:id',
        element: <CanvasPage />,
      },
    ],
  },
]);
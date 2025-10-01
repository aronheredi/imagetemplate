import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components';
import {  CanvasPage } from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <CanvasPage />,
      },
      {
        path: 'canvas',
        element: <CanvasPage />,
      },
    ],
  },
]);
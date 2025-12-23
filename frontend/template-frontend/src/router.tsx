import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components';
import { EditorLayout } from '@/components/Layouts/CanvasLayout';
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
    ],
  },
  {

    path: '/templates/edit/:id',
    element: <EditorLayout />,
    children: [
      {
        index: true,
        element: <CanvasPage />,
      },
    ],
  },
]);
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components';
import { EditorLayout } from '@/components/Layouts/CanvasLayout';
import { CanvasPage } from '@/pages';
import { TemplatesPage } from './pages/TemplatesPage';
import { AuthPage } from './pages/AuthPage';


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
  {
    path: 'auth',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <AuthPage />
      }
    ]
  }
]);
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components';
import { EditorLayout } from '@/components/Layouts/CanvasLayout';
import AuthenticatedTemplatesPage from './pages/TemplatesPage';
import AuthenticatedCanvasPage from './pages/CanvasPage';
import { AuthPage } from './pages/AuthPage';


export const router = createBrowserRouter([
  {

    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <AuthenticatedTemplatesPage />,
      },
    ],
  },
  {

    path: '/templates/edit/:id',
    element: <EditorLayout />,
    children: [
      {
        index: true,
        element: <AuthenticatedCanvasPage />,
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
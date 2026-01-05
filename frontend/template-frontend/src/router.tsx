import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components';
import { EditorLayout } from '@/components/Layouts/CanvasLayout';
import TemplatesPage from './pages/TemplatesPage';
import CanvasPage from './pages/CanvasPage';
import { AuthPage } from './pages/AuthPage';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { RootLayout } from '@/components/RootLayout';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <TemplatesPage />,
          },
        ],
      },
      {
        path: '/templates/edit/:id',
        element: (
          <ProtectedRoute>
            <EditorLayout />
          </ProtectedRoute>
        ),
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
    ]
  }
]);
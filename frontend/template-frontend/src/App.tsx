import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { Theme } from "@radix-ui/themes";
export const App = () => {
  const queryClient = new QueryClient();

  return (


    <QueryClientProvider client={queryClient}>
      <Theme grayColor='slate' >
        <RouterProvider router={router} />
      </Theme>
    </QueryClientProvider>
  );
};

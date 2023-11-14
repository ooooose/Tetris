import React from 'react';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from '@/stores/app/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CsrfProviders } from './CsrfProviders';

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <CacheProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ChakraProvider>
            <CsrfProviders>{children}</CsrfProviders>
          </ChakraProvider>
        </Provider>
      </QueryClientProvider>
    </CacheProvider>
  );
}

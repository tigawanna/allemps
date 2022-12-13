import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from './shared/extra/ErrorBoundary';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools  />
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </QueryClientProvider>
  </ErrorBoundary>
);

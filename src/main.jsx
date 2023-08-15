import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './style/index.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </DndProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

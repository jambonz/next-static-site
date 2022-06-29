import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import { KitOfParts } from '../src/js/index';

import '../pkg/public/css/styles.css';

const AppLayout = () => (
  <Outlet />
);

const HomePage = () => (
  <KitOfParts />
);

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

export const elem = document.getElementById('root') as HTMLElement;
export const root = createRoot(elem);

root.render(<App />);
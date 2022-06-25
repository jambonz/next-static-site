import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';

const AppLayout = () => (
  <>
    <nav>
      <ul>
        <li>
          <Link to="/">Home page</Link>
        </li>
        <li>
          <Link to="/test">Test page</Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </>
);

const HomePage = () => (
  <>
    <h1>Home page</h1>
  </>
);

const TestPage = () => (
  <>
    <h1>Test page</h1>
  </>
);

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="test" element={<TestPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

export const elem = document.getElementById('root');
export const root = createRoot(elem);

root.render(<App />);
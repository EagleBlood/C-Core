import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ErrorPage from './components/error/ErrorPage.tsx'
import Account from './routes/account/Account.tsx'
import Login from './components/login/Login.tsx'
import Register from './components/register/Register.tsx'
import { ThemeProvider } from 'styled-components';
import themes from './styles/themes';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function Main() {
  const [theme, setTheme] = useState(() => {
    // Get the current theme from local storage or default to 'dark'
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? themes[storedTheme as keyof typeof themes] : themes.dark;
  });

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === themes.dark ? 'light' : 'dark';
      // Store the new theme in local storage
      localStorage.setItem('theme', newTheme);
      return themes[newTheme as keyof typeof themes];
    });
  };

  useEffect(() => {
    // On initial render, set the theme to the value stored in local storage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme && themes[storedTheme as keyof typeof themes]) {
      setTheme(themes[storedTheme as keyof typeof themes]);
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App toggleTheme={toggleTheme} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/acc",
      element: <Account />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/acc/login",
          element: <Login />,
        },
        {
          path: "/acc/register",
          element: <Register />,
        },
      ],
    }
  ]);

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}/>
      </ThemeProvider>
    </React.StrictMode>
  );
}

let root: ReactDOM.Root | null = null;
document.addEventListener('DOMContentLoaded', function(event) {
  if (!root ) {
    root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
    root.render(<Main />);
  }
});
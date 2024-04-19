import React, { useState, useEffect, useCallback } from 'react'
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
import Dashboard from './components/dashboard/Dashboard.tsx'
import Users from './components/users/Users.tsx'
import { AnimatePresence } from 'framer-motion'

import AddDevice from './components/popups/addDevice/AddDevice.tsx'
import { Device, DeviceProvider } from './interfaces/DeviceContext.tsx'

function Main() {
  const [, setDevices] = useState<Device[]>([]);

  const addDeviceToDashboard = useCallback((deviceName: string, deviceType: string, deviceId: string) => {
    setDevices(prevDevices => [...prevDevices, { deviceName, deviceType, deviceId }]);
  }, []);

  const [theme, setTheme] = useState(() => {
    // Get the current theme from local storage or default to 'dark'
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? themes[storedTheme as keyof typeof themes] : themes.dark;
  });

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === themes.dark ? 'light' : 'dark';
      // Store the new theme in local storage`
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
      children: [
        {
          path: "home",
          element: <Dashboard />,
          children: [
            {
              path: "addDevice",
              element: <AddDevice />,
            },
          ],
        },
        {
          path: "profile",
          element: <Users />,
        },
      ],
    },
    {
      path: "acc",
      element: <Account />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    }
  ]);

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <AnimatePresence mode='wait'>
          <DeviceProvider >
            <RouterProvider router={router} key={location.pathname} />
          </DeviceProvider>
        </AnimatePresence>
      </ThemeProvider>
    </React.StrictMode>
  );
}

let root: ReactDOM.Root | null = null;
document.addEventListener('DOMContentLoaded', function() {
  if (!root ) {
    root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
    root.render(<Main />);
  }
});
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Dashboard from './pages/Dashboard.tsx';
import ResponsiveAppBar from './components/ResponsiveAppBar.tsx';
import PermanentDrawerLeft from './components/PermanentDrawerLeft.tsx';
import { Box } from '@mui/material';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';

let isAuthenticated = false;
if(sessionStorage.getItem("apiKey")){
  isAuthenticated = true;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: isAuthenticated ? <Dashboard /> : <Login />,
  },
  {
    path: "/dashboard",
    element: isAuthenticated ? <Dashboard /> : <Login />,
  },
  {
    path: "/login",
    element: !isAuthenticated ? <Login /> : <Dashboard />,
    
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ResponsiveAppBar />
    <Box sx={{ display: 'flex' }}>
      { isAuthenticated ? <PermanentDrawerLeft /> : null }
      <RouterProvider router={router} />
    </Box>
  </React.StrictMode>,
)

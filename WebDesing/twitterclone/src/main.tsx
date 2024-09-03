import ReactDOM from 'react-dom/client'
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import './index.css'
import Login from './components/Page/Login.tsx'
import App from './App.tsx'
import Profile from './components/Page/Profile/Profile.tsx';
import Home from './components/Page/Home/Home.tsx';

const token = window.sessionStorage.getItem('accessJwt');

const router = createBrowserRouter([
  { 
      path: "/",
      element: <Home/>,
  },
{
  path: "/login", 
  element: <Login />,
}, 
{
  path: "/profile",
  element: <Profile/>,
}])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router={router}/>
  </React.StrictMode>,
)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import Home from './Component/Home.js';
import Signin from './Component/Signin.js';
import Signup from './Component/Signup.js';
import Profile from './Component/Profile.js';
import Connections from './Component/Connections.js';
import Interest from './Component/Interest.js';
import Trypremium from './Component/Trypremium.js';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="home" element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="connections" element={<Connections />} />
      <Route path="interest" element={<Interest />} />
      <Route path="trypremium" element={<Trypremium />} />
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
    </Route>
  )
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);



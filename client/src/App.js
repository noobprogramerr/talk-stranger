import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Component/Header.js';
import Footer from './Component/Footer.js';

const App = () => {
  return (
    <>
      <div className="w-full ">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default App;

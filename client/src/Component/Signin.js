import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import Loginlogo from '../Image/login.jpeg';


const Signin = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {

    setFormData({ ...formData,[e.target.id]:e.target.value, });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            {/* <img className="mx-auto h-24 w-auto" src={Loginlogo} alt="Sign In" /> */}
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign In
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex ">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign In
              </button>
            </div>

            <div className=" ">
              {/* <Link to="/forgot" className="">
                Forgot Password?
              </Link> */}

              <h4>
                New Account ?
                <Link
                  to="/signup"
                  className="text-blue-500 hover:text-blue-700 mx-1 font-bold   focus:outline-none focus:shadow-outline"
                >
                  Sign up
                </Link>
              </h4>
            </div>
          </form>
        </div>
      </div>
    
    </>
  );
};

export default Signin;

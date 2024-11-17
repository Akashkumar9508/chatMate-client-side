import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Nav from '../components/Nav.jsx';

const Signup = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/signup', data);
      toast.success('Signup successful!', { duration: 4000 });
      console.log('Signup Successful:', response.data);
      reset();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred during signup.';
      toast.error(errorMessage, { duration: 4000 });
      console.error('Signup Error:', errorMessage);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Nav />

      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6 mx-5">
          <h2 className="text-2xl font-bold text-center text-white mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="FullName">
                Full Name
              </label>
              <input
                id="FullName"
                type="text"
                placeholder="Enter your Full Name"
                {...register('fullName', { required: 'Full Name is required' })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.FullName && (
                <p className="text-red-500 text-sm mt-1">{errors.FullName.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="UserName">
                User Name
              </label>
              <input
                id="UserName"
                type="text"
                placeholder="Enter your User Name"
                {...register('userName', { required: 'User Name is required' })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.UserName && (
                <p className="text-red-500 text-sm mt-1">{errors.UserName.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address',
                  },
                })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Sign Up
              </button>
            </div>
            <div className="flex items-center justify-center w-full gap-2 text-white">
              <p className="font-medium">Already have an Account?</p>
              <Link className="font-bold" to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

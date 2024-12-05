import React, { useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'; 
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Nav from '../components/Nav.jsx';
import authService from '../services/authService.js';
import generateAvatar from '../utils/avatarGenerator.js'
import signupPng from "../assets/Signup.png";

const Signup = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const userName = watch('userName') || 'placeholder';
  const avatar = generateAvatar(userName); 

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      await authService.createAccount(
        data.fullName,
        data.userName,
        data.email,
        data.password,
        avatar
      );
      toast.success('Signup successful!', { duration: 4000 });
      reset();
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred during signup.';
      toast.error(errorMessage, { duration: 4000 });
      console.error('Signup Error:', errorMessage);
    }
  };

  return (
    <div className="min-h-screen mainSection">
  <Nav />

  <div className="flex items-center w-full justify-center min-h-[calc(100vh-64px)]">
    <div className="w-full max-w-6xl flex flex-col md:flex-row mainSection shadow-lg rounded-lg">
      
      {/* Left Image Section (Hidden on small screens) */}
      <div className="imgDiv w-full md:w-1/2 hidden md:block">
        <img
          src={signupPng} // You can replace this with a relevant image for Sign Up if needed
          alt="Sign Up illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form Section */}
      <div className="login w-full md:w-1/2 flex flex-col justify-center md:p-10 p-4">
        <h2 className="text-4xl font-bold text-center">Sign Up</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center mt-8"
        >
          <div className="mb-3">
            <label
              className="block text-sm font-bold mb-2 text-[#8e52ff]"
              htmlFor="FullName"
            >
              Full Name
            </label>
            <input
              id="FullName"
              type="text"
              {...register('fullName', { required: 'Full Name is required' })}
              className="w-full text-base px-3 py-2 border rounded-lg focus:outline-none"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label
              className="block text-sm font-bold mb-2 text-[#8e52ff]"
              htmlFor="UserName"
            >
              User Name
            </label>
            <input
              id="UserName"
              type="text"
              {...register('userName', { required: 'User Name is required' })}
              className="w-full text-base px-3 py-2 border rounded-lg focus:outline-none"
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label
              className="block text-sm font-bold mb-2 text-[#8e52ff]"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              className="w-full text-base px-3 py-2 border rounded-lg focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-3 relative">
            <label
              className="block text-sm font-bold mb-2 text-[#8e52ff]"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
              className="w-full text-base px-3 py-2 border rounded-lg focus:outline-none"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 top-6 flex items-center text-gray-500"
            >
              {showPassword ? (
                <HiOutlineEye size={20} />
              ) : (
                <HiOutlineEyeOff size={20} />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-3">
            <button
              type="submit"
              className="w-full bg-[#8e52ff] font-bold py-2 px-4 rounded-lg hover:bg-[#542aa4] focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign Up
            </button>
          </div>

          <div className="flex items-center justify-center w-full gap-2">
            <p className="font-medium">Already have an account?</p>
            <Link className="font-bold text-[#8e52ff]" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

  );
};

export default Signup;

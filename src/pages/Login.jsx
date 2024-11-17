import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx'; 

const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    console.log('Login Data:', data);
    if (data.email && data.password) {
      alert('Login successful!');
      reset();
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Nav />

      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6 md:m-0 m-5">
          <h2 className="text-2xl font-bold text-center text-white mb-6">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register('password', { required: 'Password is required' })}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Login
              </button>
            </div>

            <div className="flex items-center justify-center w-full gap-2 text-white">
              <p className="font-medium">Don't have an account?</p>
              <Link className="font-bold" to="/signup">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

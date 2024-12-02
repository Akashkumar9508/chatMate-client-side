import React from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice.js";

import Nav from "../components/Nav.jsx";
import authService from "../services/authService.js";
import loginPng from "/public/assets/login.png";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data);
      if (response.user) {
        dispatch(login(response.user));

        toast.success("Login successful!");
        reset();
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen mainSection">
      <Nav />

      <div className="flex items-center w-full justify-center min-h-[calc(100vh-64px)]">
        <div className="w-full max-w-5xl flex flex-col md:flex-row mainSection text-black shadow-lg rounded-lg">
          {/* Left Image Section (Hidden on small screens) */}
          <div className="imgDiv w-full md:w-1/2 hidden md:block">
            <img
              src={loginPng}
              alt="Login illustration"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Form Section */}
          <div className="login w-full md:w-1/2 flex flex-col justify-center p-10">
            <h2 className="text-4xl font-bold text-center">Login</h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-center gap-6 mt-8"
            >
              <div className="mb-4">
                <label
                  className="block text-sm font-bold mb-2 text-[#8e52ff]"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="Enter your email"
                  className="w-full text-base px-4 py-4 border rounded-lg focus:outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-4 relative">
                <label
                  className="block text-sm font-bold mb-2 text-[#8e52ff] "
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Enter your password"
                  className="w-full px-4 py-4 border rounded-lg focus:outline-none"
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-[#8e52ff] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#542aa4] focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Login
                </button>
              </div>

              <div className="flex items-center justify-center w-full gap-2">
                <p className="font-medium">Don't have an account?</p>
                <Link className="font-bold text-[#8e52ff]" to="/signup">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

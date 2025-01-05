import React, { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import authService from "../services/authService.js";
import generateAvatar from "../utils/avatarGenerator.js";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const userName = watch("userName") || "placeholder";
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
      toast.success("Signup successful!", { duration: 4000 });
      reset();
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during signup.";
      toast.error(errorMessage, { duration: 4000 });
      console.error("Signup Error:", errorMessage);
    }
  };

  return (
    <div className="h-[88vh] flex items-center justify-center bg-base-100"> 
      <div className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden w-full h-[95%] max-w-4xl bg-base-200">  
      
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://res.cloudinary.com/chatmateapp/image/upload/v1734677395/vmtkdspxvtcvvdtapqsi.png"
            alt="Sign Up illustration"
            className="h-full w-full object-cover"
          />
        </div>

        
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-base-content">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">

            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-base-content"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                {...register("fullName", { required: "Full Name is required" })}
                className="input input-bordered mt-1 w-full" 
              />
              {errors.fullName && (
                <p className="text-sm text-error mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-base-content"
              >
                User Name
              </label>
              <input
                id="userName"
                type="text"
                {...register("userName", { required: "User Name is required" })}
                className="input input-bordered mt-1 w-full"  
              />
              {errors.userName && (
                <p className="text-sm text-error mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>


            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-base-content"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="input input-bordered mt-1 w-full"
              />
              {errors.email && (
                <p className="text-sm text-error mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>


            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-base-content"
              >
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="input input-bordered mt-1 w-full"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-4 top-6 text-base-content hover:text-secondary"
              >
                {showPassword ? (
                  <HiOutlineEye size={20} />
                ) : (
                  <HiOutlineEyeOff size={20} />
                )}
              </button>
              {errors.password && (
                <p className="text-sm text-error mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

    
            <button
              type="submit"
              className="btn btn-primary w-full"  
            >
              Sign Up
            </button>
          </form>

    
          <div className="mt-6 text-center">
            <p className="text-sm text-base-content">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

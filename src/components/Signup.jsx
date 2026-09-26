import { React, useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");

    try {
      const createdUser = await authService.createAccount(data);

      if (createdUser) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(login({ userData }));
        }

        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-[#111827] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-[#374151] bg-[#1F2937] p-6 shadow-xl shadow-black/20 sm:p-8">
          <div className="mb-6 flex justify-center">
            <Logo width="64px" />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[#F9FAFB] sm:text-3xl">
              Join Quorilo
            </h2>

            <p className="mt-2 text-sm text-[#9CA3AF]">
              Create an account and start sharing your ideas
            </p>
          </div>

          <p className="mt-5 text-center text-sm text-[#9CA3AF]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#2A9D8F] transition-colors duration-200 hover:text-[#38B2A3]">
              Sign in
            </Link>
          </p>

          {error && (
            <div className="mt-6 rounded-lg border border-red-900/50 bg-red-950/40 px-4 py-3 text-center text-sm text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(create)} className="mt-8">
            <div className="space-y-5">
              <Input
                label="Name"
                placeholder="Enter your name"
                {...register("name", { required: true })}
              />

              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                      "Email address must be a valid address",
                  },
                })}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Create a password"
                {...register("password", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                        value,
                      ) ||
                      "Password must be at least 8 characters with uppercase, lowercase, number, and special character",
                  },
                })}
              />

              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-[#6B7280]">
          Your words. Your world.
        </p>
      </div>
    </div>
  );
}

export default Signup;

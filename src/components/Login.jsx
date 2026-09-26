import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");

    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(authLogin({ userData }));
        }

        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-68px)] items-center justify-center bg-[#111827] px-4 py-8 sm:min-h-[calc(100vh-72px)] sm:py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-[#374151] bg-[#1F2937] p-5 shadow-xl shadow-black/20 sm:p-8">
          <div className="mb-5 flex justify-center sm:mb-6">
            <Logo width="58px" />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[#F9FAFB] sm:text-3xl">
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-[#9CA3AF]">
              Sign in to continue to Quorilo
            </p>
          </div>

          <p className="mt-5 text-center text-sm text-[#9CA3AF]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-[#2A9D8F] hover:text-[#38B2A3]">
              Create one
            </Link>
          </p>

          {error && (
            <div className="mt-5 rounded-lg border border-red-900/50 bg-red-950/40 px-4 py-3 text-center text-sm leading-5 text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(login)} className="mt-7">
            <div className="space-y-5">
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
                placeholder="Enter your password"
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
                Sign in
              </Button>
            </div>
          </form>
        </div>

        <p className="mt-5 text-center text-xs text-[#6B7280] sm:mt-6">
          Your words. Your world.
        </p>
      </div>
    </div>
  );
}

export default Login;

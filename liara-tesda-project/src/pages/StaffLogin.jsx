import React, { useState } from "react";

import pic from "../assets/TESDA-emblem-white.png";
import background from "../assets/pic1.png";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig.js";
import { toast } from "react-toastify";

export default function StaffLogin() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!employeeId) return setError("Please enter your employee ID.");
    if (!password) return setError("Please enter your password.");
    
    console.log("submit", { employeeId, password });

    try {
        const response = await axiosInstance.post("/staff/login", {"employeeID": employeeId, "password": password }, {withCredentials: true});
        if(!response.data.success){
            toast.error(response.data.message);
        }else{
            const token = response.data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('name', response.data.data.lastName+", "+response.data.data.firstName+" "+response.data.data.middleName);
            navigate("/home");
        }

        } catch (err) {
            console.error("Login error:", err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" 
        style={{
                backgroundImage: `url('${background}')`,
        }}
    >
    <div className="fixed top-0 left-0 inset-0 bg-blue-900/80 w-auto h-full " />
      <div className="w-full max-w-4xl my-10 bg-white shadow-md rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 z-5">
        <div className="relative hidden md:flex items-center justify-center bg-gray-100">
          <div className="p-6 w-full h-full flex items-center justify-center">
            <div
              className="max-w-[520px] w-full h-[420px] md:h-[640px] lg:h-[720px] border-8 border-white shadow-2xl rounded-xl overflow-hidden bg-cover bg-center"
              style={{
                backgroundImage: `url('${pic}')`,
              }}
              aria-hidden="true"
            >
              <div className="h-full w-full flex flex-col justify-end p-6 bg-gradient-to-t from-black/85 to-transparent text-white">
                <h3 className="text-2xl font-semibold">Welcome back</h3>
                <p className="text-sm opacity-90">Please sign in with your credentials</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="block md:hidden mb-6">
            <div
              className="w-full rounded-xl overflow-hidden border-6 border-white shadow-lg h-56 bg-cover bg-center"
              style={{
                backgroundImage: `url('${pic}')`,
              }}
              aria-hidden="true"
            >
              <div className="h-full w-full flex flex-col justify-end p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                <h3 className="text-xl font-semibold">Welcome back</h3>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold">Employee Login</h2>
            <p className="text-sm text-gray-500 mt-1">Enter your employee ID and password.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-sm text-red-600">{error}</div>}

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Employee ID</span>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                placeholder="EMP12345"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                placeholder="••••••••"
                required
              />
            </label>
            <div className="flex justify-between items-center my-10">
                <span className="text-sm font-medium text-gray-700"> </span>
                <Link className="text-sm text-indigo-600 hover:underline" to="/request-password-reset">Forgot password?</Link>
              </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
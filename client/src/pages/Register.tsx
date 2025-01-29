import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const navigate = useNavigate();

  // Validate form fields
  const validateForm = () => {
    const errors: { username?: string; password?: string } = {};
    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      // Check if username is unique
      const usernameCheck = await api.get(`/auth?username=${username}`);
      if (usernameCheck.data.exists) {
        setFormErrors((prev) => ({
          ...prev,
          username: "Username is already taken, please choose another.",
        }));
        return;
      }

      // If username is unique, proceed with registration
      await api.post("/auth/register", { username, password });
      navigate("/login");
    } catch (error: any) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-300 to-blue-200">
      <div className="max-w-md w-full p-8 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-bold text-center text-teal-800 mb-6">
          Welcome to Brana! 🎉
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Create your account and get started with our platform.
        </p>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              required
              className={`w-full p-4 border ${
                formErrors.username ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {formErrors.username && (
              <p className="text-red-500 text-sm">{formErrors.username}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              required
              className={`w-full p-4 border ${
                formErrors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm">{formErrors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-3 text-white font-semibold rounded-lg ${
              formErrors.username || formErrors.password
                ? "bg-gray-400"
                : "bg-green-500 hover:bg-green-600"
            } transition duration-300`}
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <span
              className="text-teal-600 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

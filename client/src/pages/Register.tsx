import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const navigate = useNavigate();

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

    setLoading(true);

    try {
      const usernameCheck = await api.get(
        `/auth/username?username=${username}`
      );
      if (usernameCheck.data.exists) {
        setFormErrors((prev) => ({
          ...prev,
          username: "Username is already taken, please choose another.",
        }));
        setLoading(false);
        return;
      }

      const res = await api.post("/auth/register", { username, password });
      console.log("Registration response:", res.data);

      setPopup({
        message: "🎉 Registration successful! Redirecting you to login...",
        type: "success",
      });

      setTimeout(() => navigate("/login"), 3000);
    } catch (error: any) {
      console.error("Registration error:", error);
      setPopup({
        message: error.response?.data?.message || "Registration failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-300 to-blue-200 relative">
      <div className="max-w-md w-full p-8 bg-white shadow-md rounded-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-teal-800 mb-4">
          Welcome to Brana! 🎉
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Create your account and get started.
        </p>

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
            className={`w-full cursor-pointer py-3 text-white font-semibold rounded-lg transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
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

      {popup && (
        <div className="fixed top-10 right-10 bg-white shadow-lg rounded-lg px-6 py-3 flex items-center gap-2 transition-all duration-300 animate-slide-up">
          {popup.type === "success" ? (
            <span className="text-green-500 text-xl">✔️</span>
          ) : (
            <span className="text-red-500 text-xl">❌</span>
          )}
          <p className="text-sm font-medium text-gray-800">{popup.message}</p>
        </div>
      )}
    </div>
  );
};

export default Register;

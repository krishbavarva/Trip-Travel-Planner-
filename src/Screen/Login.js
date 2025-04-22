// src/pages/Auth.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("redirect") || "/";

  const generateToken = () => {
    return Math.random().toString(36).substring(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      const user = JSON.parse(localStorage.getItem(email));
      if (!user) {
        alert("User not found. Redirecting to register.");
        setIsLogin(false);
        return;
      }

      if (user.password !== password) {
        alert("Incorrect password.");
        return;
      }

      localStorage.setItem("token", generateToken());
      localStorage.setItem("loggedInUser", email); // ✅ Store user email
      alert("Login successful!");
      navigate(redirectPath);
    } else {
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      const existingUser = localStorage.getItem(email);
      if (existingUser) {
        alert("User already exists. Please login.");
        setIsLogin(true);
        return;
      }

      const userData = { email, password };
      localStorage.setItem(email, JSON.stringify(userData));
      localStorage.setItem("token", generateToken());
      localStorage.setItem("loggedInUser", email); // ✅ Store user email
      alert("Registration successful!");
      navigate(redirectPath);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          {isLogin ? "Login to Travel Planner" : "Register for Travel Planner"}
        </h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border text-black rounded-lg focus:ring focus:ring-blue-200"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border text-black rounded-lg focus:ring focus:ring-blue-200"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div className="mt-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border text-black rounded-lg focus:ring focus:ring-blue-200"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Register here
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Login here
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Auth;

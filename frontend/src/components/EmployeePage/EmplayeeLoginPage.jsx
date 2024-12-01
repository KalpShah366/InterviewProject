import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeLoginPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        alert("Please enter your email");
        return;
      }
      const result = await axios.post("http://localhost:5000/api/Login", {
        email,
      });
      console.log("User logged in successfully:", result.data);
      navigate("/roles");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in. Please try again later.");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleUserLogin}
        className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          Employee Login
        </h2>
        <label className="text-lg font-semibold text-gray-700">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default EmployeeLoginPage;

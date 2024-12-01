import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const EmployeeSignUpPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");
  const navigate = useNavigate();

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      if (!fullName || !email || !mobile || !gender || !education) {
        alert("Please fill all the required fields");
        return;
      }
      const response = await axios.post("http://localhost:5000/api/Signup", {
        fullName,
        email,
        mobile,
        gender,
        education,
      });
      console.log("User logged in successfully:", response.data);
      navigate("/login");
    } catch (error) {
      if (error.message && error.response.data) {
        alert(error.response.data.error);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Employee Sign Up
        </h1>
        <form onSubmit={handleUserLogin} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name:
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Mobile:
            </label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Gender:
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Education:
            </label>
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="BE">BE</option>
              <option value="BTech">BTech</option>
              <option value="Diploma">Diploma</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
        <Link to="/login">Existing User : Login</Link>
      </div>
    </div>
  );
};

export default EmployeeSignUpPage;

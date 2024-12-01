import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const EmployeeRoles = () => {
  const [roles, setRoles] = useState({});
  const [user, setUser] = useState([]);
  const [newRoles, setNewRoles] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getUser");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    getUsers();
  }, []);

  const handleInputChange = (id, value) => {
    setRoles((prevRoles) => ({ ...prevRoles, [id]: value }));
  };

  const handleRoleChange = async (id) => {
    if (!roles[id]) {
      alert("Please enter a role before assigning.");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${id}/roles`,
        { roles: roles[id] }
      );
      alert(`Role for ${response.data.fullName} is updated to ${roles[id]}`);
      setRoles((prevRoles) => ({ ...prevRoles, [id]: "" }));
    } catch (error) {
      alert("Error assigning role", error);
    }
  };
  const handleAddRole = () => {
    if (!input) {
      alert("Add Roles to continue");
    }
    setNewRoles([...newRoles, input]);
    setInput("");
  };
  const handleNavigate = () => {
    navigate("/menumaster", { state: { roles: newRoles } });
  };

  return (
    <div className="p-4 space-y-6">
      {user.map((item) => (
        <div
          key={item._id}
          className="border border-gray-300 rounded-lg p-4 shadow-md space-y-2"
        >
          <p className="text-lg font-semibold text-gray-800">
            Name: {item.fullName}
          </p>
          <p className="text-gray-600">Email: {item.email}</p>
          <p className="text-gray-600">Roles: {item.roles}</p>
          <input
            type="text"
            placeholder="Enter Roles to the User"
            value={roles[item._id] || ""}
            onChange={(e) => handleInputChange(item._id, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {item._id && (
            <button
              onClick={() => handleRoleChange(item._id)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Assign Role
            </button>
          )}
          <hr className="my-4 border-t border-gray-300" />
        </div>
      ))}

      <div className="space-y-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add Roles"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleAddRole}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          Add Roles
        </button>
      </div>

      <div className="space-y-6">
        {newRoles.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 shadow-md space-y-2"
          >
            <p className="text-gray-700">{item}</p>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500"
                />
                <span className="text-gray-700">Create</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500"
                />
                <span className="text-gray-700">Read</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500"
                />
                <span className="text-gray-700">Edit</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500"
                />
                <span className="text-gray-700">Delete</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleNavigate}
        className="bg-indigo-500 text-white px-6 py-3 rounded-md hover:bg-indigo-600 transition"
      >
        Go to New Page
      </button>
    </div>
  );
};

export default EmployeeRoles;

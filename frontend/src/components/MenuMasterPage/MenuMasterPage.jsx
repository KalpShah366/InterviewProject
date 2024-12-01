// import React from "react";
import { useLocation } from "react-router-dom";

const MenuMasterPage = () => {
  const location = useLocation();
  const { roles } = location.state || { roles: [] };
  const handleSaveToLocalStorage = () => {
    localStorage.setItem("roles", JSON.stringify(roles));
    alert("Roles saved to localStorage!");
  };
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">New Page</h1>
        {roles.length > 0 ? (
          <div className="space-y-2">
            {roles.map((role, index) => (
              <p key={index} className="text-gray-700">
                {role}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No roles found</p>
        )}
      </div>

      <button
        onClick={handleSaveToLocalStorage}
        className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition"
      >
        Save
      </button>
    </div>
  );
};

export default MenuMasterPage;

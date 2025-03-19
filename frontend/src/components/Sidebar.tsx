import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Activity, DollarSign, Heart, MessageSquare, Trophy } from "lucide-react";

const Sidebar = () => {
  const { user, logoutUser } = useAuth();

  const menuItems = [
    { icon: Activity, label: "Performance", path: "/performance" },
    { icon: Heart, label: "Health", path: "/health" },
    { icon: Trophy, label: "Career", path: "/career" },
    { icon: DollarSign, label: "Finance", path: "/finance" },
    { icon: MessageSquare, label: "Messages", path: "/messages" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 shadow-lg">
      <NavLink to="/" className="flex items-center gap-3 mb-8">
        <Trophy className="w-8 h-8 text-blue-600" />
        <span className="text-xl font-bold">AthleteHub</span>
      </NavLink>

      <div className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-blue-50"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="absolute bottom-4 w-52">
        {user ? (
          <div className="p-3 bg-gray-100 rounded-lg text-center">
            <p className="font-semibold text-lg">👤 {user.name}</p>
            <button onClick={logoutUser} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
              Logout
            </button>
          </div>
        ) : (
          <div className="p-3 bg-gray-100 rounded-lg text-center">
            <NavLink to="/login" className="block bg-blue-500 text-white py-2 rounded mb-2">Login</NavLink>
            <NavLink to="/signup" className="block bg-green-500 text-white py-2 rounded">Signup</NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

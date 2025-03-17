import React, { useState, useEffect } from "react";
import { Activity, DollarSign, Heart, MessageSquare, Trophy } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [user, setUser] = useState<string | null>(localStorage.getItem("username") || null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(localStorage.getItem("username") || null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  const menuItems = [
    { icon: Activity, label: "Performance", path: "/performance" },
    { icon: Heart, label: "Health", path: "/health" },
    { icon: Trophy, label: "Career", path: "/career" },
    { icon: DollarSign, label: "Finance", path: "/finance" },
    { icon: MessageSquare, label: "Messages", path: "/messages" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col h-screen">
      <NavLink to="/" className="flex items-center gap-3 mb-8">
        <Trophy className="w-8 h-8 text-blue-600" />
        <span className="text-xl font-bold">AthleteHub</span>
      </NavLink>

      <div className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-blue-50"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="p-3 bg-gray-100 rounded-lg">
        {user ? (
          <div className="flex flex-col items-center">
            <p className="font-semibold text-gray-700">Welcome, {user}!</p>
            <button onClick={handleLogout} className="mt-2 px-4 py-2 bg-red-500 text-white rounded w-full text-center">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <NavLink to="/login" className="bg-blue-500 text-white text-center py-2 rounded w-full mb-2">
              Login
            </NavLink>
            <NavLink to="/signup" className="bg-green-500 text-white text-center py-2 rounded w-full">
              Signup
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import { Activity, Award, TrendingUp, Users } from 'lucide-react';
import { useEffect,useState } from 'react';

const Dashboard = () => {

  interface User {
    id: number;
    name: string;
    email: string;
  }
  
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/some-endpoint");
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const text = await response.text(); // First, get the raw text
      const data = text ? JSON.parse(text) : {}; // Prevent JSON.parse on empty response
  
      setDashboardData(data);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      setDashboardData(null); // Prevent app crash
    }
  };
  
  

  const [users, setUsers] = useState<User[]>([]);


useEffect(() => {
  fetch('http://localhost:5000/api/users')
    .then((res) => res.json())
    .then((data) => setUsers(data))
    .catch((error) => console.error('Error:', error));
}, []);



  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Track New Activity
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: Activity, label: 'Performance Score', value: '85%', color: 'bg-green-100 text-green-600' },
          { icon: TrendingUp, label: 'Training Progress', value: '+12%', color: 'bg-blue-100 text-blue-600' },
          { icon: Award, label: 'Achievements', value: '24', color: 'bg-purple-100 text-purple-600' },
          { icon: Users, label: 'Team Members', value: '8', color: 'bg-orange-100 text-orange-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm">
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <h3 className="text-gray-500 text-sm">{stat.label}</h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {[
              { title: 'Morning Training', time: '2 hours ago', type: 'Training' },
              { title: 'Team Meeting', time: '5 hours ago', type: 'Meeting' },
              { title: 'Recovery Session', time: 'Yesterday', type: 'Recovery' },
            ].map((activity) => (
              <div key={activity.title} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.type}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {[
              { title: 'Team Practice', date: 'Today, 4:00 PM', type: 'Practice' },
              { title: 'Fitness Assessment', date: 'Tomorrow, 10:00 AM', type: 'Assessment' },
              { title: 'Sponsorship Meeting', date: 'Mar 15, 2:00 PM', type: 'Meeting' },
            ].map((event) => (
              <div key={event.title} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </div>
                <span className="text-sm text-gray-500">{event.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Registered Users</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="mb-2">
                <strong>{user.name}</strong> ({user.email})
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
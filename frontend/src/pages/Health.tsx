import React from 'react';
import { Heart, AlertCircle, Pill, Calendar } from 'lucide-react';

const Health = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Health & Injury Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Current Status</h2>
            <Heart className="text-red-600" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium text-green-700">Cleared for Training</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Last Check-up</p>
                <p className="font-medium">March 1, 2024</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Next Assessment</p>
                <p className="font-medium">April 1, 2024</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Injury Risk Assessment</h2>
            <AlertCircle className="text-yellow-600" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span>Right Shoulder</span>
              <span className="text-yellow-600 font-medium">Medium Risk</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span>Left Knee</span>
              <span className="text-red-600 font-medium">High Risk</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span>Lower Back</span>
              <span className="text-green-600 font-medium">Low Risk</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Medical History</h2>
            <Pill className="text-blue-600" />
          </div>
          <div className="space-y-4">
            {[
              { date: 'Jan 15, 2024', issue: 'Shoulder Strain', status: 'Recovered' },
              { date: 'Nov 20, 2023', issue: 'Knee Rehabilitation', status: 'Ongoing' },
              { date: 'Aug 5, 2023', issue: 'Ankle Sprain', status: 'Recovered' },
            ].map((record) => (
              <div key={record.date} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{record.issue}</p>
                  <p className="text-sm text-gray-500">{record.date}</p>
                </div>
                <span className={`text-sm ${
                  record.status === 'Recovered' ? 'text-green-600' : 'text-yellow-600'
                }`}>{record.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
            <Calendar className="text-purple-600" />
          </div>
          <div className="space-y-4">
            {[
              { date: 'Mar 20, 2024', type: 'Physical Therapy', provider: 'Dr. Smith' },
              { date: 'Mar 25, 2024', type: 'Nutrition Consultation', provider: 'Dr. Johnson' },
              { date: 'Apr 1, 2024', type: 'Performance Assessment', provider: 'Coach Williams' },
            ].map((appointment) => (
              <div key={appointment.date} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{appointment.type}</p>
                  <p className="text-sm text-gray-500">{appointment.provider}</p>
                </div>
                <span className="text-sm text-blue-600">{appointment.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Health;
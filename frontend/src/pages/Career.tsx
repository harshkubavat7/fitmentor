import React from 'react';
import { Trophy, Target, Briefcase, Users } from 'lucide-react';

const Career = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Career Development</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Training Plan</h2>
            <Target className="text-blue-600" />
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-blue-100 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">This Week's Focus</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Speed and Agility Training</li>
                <li>• Strength Building</li>
                <li>• Technical Skills Development</li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Completion Rate</p>
                <p className="font-medium text-green-600">85%</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Next Review</p>
                <p className="font-medium">March 20</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Career Stats</h2>
            <Trophy className="text-yellow-600" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-700">Championships</p>
              <p className="text-2xl font-bold text-yellow-600">3</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">Pro Years</p>
              <p className="text-2xl font-bold text-blue-600">5</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700">Win Rate</p>
              <p className="text-2xl font-bold text-green-600">76%</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-700">Rankings</p>
              <p className="text-2xl font-bold text-purple-600">#12</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Scouting Opportunities</h2>
            <Briefcase className="text-purple-600" />
          </div>
          <div className="space-y-4">
            {[
              { team: 'Red Bulls FC', position: 'Forward', deadline: 'Mar 30, 2024' },
              { team: 'Blue Eagles', position: 'Striker', deadline: 'Apr 15, 2024' },
              { team: 'Green Lions', position: 'Forward', deadline: 'Apr 20, 2024' },
            ].map((opportunity) => (
              <div key={opportunity.team} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{opportunity.team}</p>
                  <p className="text-sm text-gray-500">{opportunity.position}</p>
                </div>
                <div className="text-right">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Apply</button>
                  <p className="text-xs text-gray-500">Due {opportunity.deadline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Mentorship Program</h2>
            <Users className="text-green-600" />
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="font-medium text-green-800">Your Mentor</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <p className="font-medium">Michael Johnson</p>
                  <p className="text-sm text-green-700">Former Olympic Athlete</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Next Sessions</h3>
              {[
                { date: 'Mar 18, 2024', topic: 'Career Strategy Planning' },
                { date: 'Mar 25, 2024', topic: 'Performance Review' },
              ].map((session) => (
                <div key={session.date} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <span className="font-medium">{session.topic}</span>
                  <span className="text-sm text-gray-500">{session.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
import React, { useState, useEffect } from "react";
import { submitPerformanceData, getPerformanceData } from "../api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";


const Performance = () => {
  const [formData, setFormData] = useState({
    userId: "12345",
    benchPress: "",
    squats: "",
    deadlifts: "",
    speed: "",
    stamina: "",
    strength: "",
    agility: "",
    endurance: "",
    performance_score: "",
  });

  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchPerformanceData();
  }, []);

  const fetchPerformanceData = async () => {
    const data = await getPerformanceData(formData.userId);
    setSubmissions(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitPerformanceData(formData);
    fetchPerformanceData();
    setFormData({ ...formData, benchPress: "", squats: "", deadlifts: "", speed: "", stamina: "", strength: "", agility: "", endurance: "", performance_score: "" });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Performance Tracking</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        {Object.keys(formData).map((field) => (
          <div key={field} className="mb-2">
            <label className="block text-sm font-semibold">{field.toUpperCase()}</label>
            <input type="number" name={field} value={formData[field]} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Submit</button>
      </form>

      <h2 className="text-lg font-semibold mb-4">Past Submissions</h2>
  <ul className="space-y-4">
  {submissions.map((submission, index) => (
    <li key={index} className="bg-white p-4 rounded shadow">
      <p><strong>Date:</strong> {new Date(submission.date).toLocaleString()}</p>
      <p><strong>Bench Press:</strong> {submission.benchPress} sets × 12 reps</p>
      <p><strong>Squats:</strong> {submission.squats} sets × 8 reps</p>
      <p><strong>Deadlifts:</strong> {submission.deadlifts} sets × 10 reps</p>
      <p><strong>Speed:</strong> {submission.speed} m/s</p>
      <p><strong>Stamina:</strong> {submission.stamina} level</p>
      <p><strong>Strength:</strong> {submission.strength} level</p>
      <p><strong>Agility:</strong> {submission.agility} level</p>
      <p><strong>Endurance:</strong> {submission.endurance} level</p>
      <p><strong>Performance Score:</strong> {submission.performance_score} points</p>
    </li>
  ))}
  </ul>
  <div className="bg-white p-6 rounded-xl shadow-sm mt-8">
        <h2 className="text-lg font-semibold mb-4">Performance Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={submissions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="benchPress" stroke="#8884d8" name="Bench Press" />
            <Line type="monotone" dataKey="squats" stroke="#82ca9d" name="Squats" />
            <Line type="monotone" dataKey="deadlifts" stroke="#ffc658" name="Deadlifts" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Performance;

  
  // The  Performance  component is a form that allows users to submit their workout data. The form has three input fields for the number of sets and reps for bench press, squats, and deadlifts. The data is submitted to the backend when the user clicks the submit button. 
  // The  fetchPerformanceData  function is called when the component mounts to fetch the user's past submissions. The data is displayed in a list below the form. 
  // The  submitPerformanceData  and  getPerformanceData  functions are imported from the  api.ts  file. These functions make requests to the backend API to submit and retrieve performance data. 
  // The  handleChange  function updates the form data when the user types in the input fields. The  handleSubmit  function is called when the user submits the form. It sends the form data to the backend and refreshes the data displayed on the page. 
  // Step 5: Update the App Component 
  // Finally, update the  App.tsx  file to include the  Performance  component.
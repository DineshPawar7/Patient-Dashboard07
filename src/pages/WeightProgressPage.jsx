import React, { useState, useEffect } from 'react';
import { mockWeightData } from '../data/Data.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { FiTrendingUp, FiList, FiAlertCircle } from 'react-icons/fi';
import StatCard from "../components/StatCard";

const WeightProgressPage = () => {
  const [weightData, setWeightData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeightData = async () => {
      try {
        setLoading(true);

        const formattedData = mockWeightData
          .map(entry => {
            const dateObj = new Date(entry.date);
            return {
              ...entry,
              date: dateObj,
              formattedDate: format(dateObj, 'MMM dd'),
              fullDate: format(dateObj, 'MMMM dd, yyyy')
            };
          })
          .sort((a, b) => a.date - b.date);

        setWeightData(formattedData);
        setError(null);
      } catch (err) {
        console.error("Error loading weight data:", err);
        setError('Failed to load weight data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeightData();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading weight progress...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 bg-red-50 p-4 rounded-md flex items-center justify-center">
        <FiAlertCircle className="mr-2 h-5 w-5" /> {error}
      </div>
    );
  }

  const userHeightM = 1.75;
  const userGoalWeight = 70;

  const latestWeightEntry = weightData[weightData.length - 1];
  const currentBMI = latestWeightEntry ? (latestWeightEntry.weightKg / (userHeightM * userHeightM)).toFixed(1) : 'N/A';
  const progressToGoal = latestWeightEntry ? `${(latestWeightEntry.weightKg - userGoalWeight).toFixed(1)} kg to goal` : 'Set goal';

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Weight Progress</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Current Weight"
          value={latestWeightEntry ? `${latestWeightEntry.weightKg} kg` : 'N/A'}
          icon={<FiTrendingUp size={24} />}
          bgColor="bg-[#DC8BE0]"
        />
        <StatCard
          title="Current BMI"
          value={currentBMI}
          icon={<FiTrendingUp size={24} />}
          bgColor="bg-[#F79B72]"
        />
        <StatCard
          title="Progress to Goal"
          value={progressToGoal}
          icon={<FiTrendingUp size={24} />}
          bgColor="bg-[#FFE1E0]"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <FiTrendingUp className="mr-2 text-acme-primary" /> Weight Over Time
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={weightData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="formattedDate" stroke="#6b7280" />
            <YAxis unit="kg" stroke="#6b7280" domain={['dataMin - 2', 'dataMax + 2']} />
            <Tooltip
              contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc' }}
              labelStyle={{ color: '#333', fontWeight: 'bold' }}
              formatter={(value, name, props) => [`${value} kg`, `Weight on ${props.payload.fullDate}`]}
            />
            <Legend />
            <Line type="monotone" dataKey="weightKg" name="Weight (kg)" stroke="#1D4ED8" strokeWidth={2} activeDot={{ r: 8 }} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <FiList className="mr-2 text-acme-primary" /> Historical Weight Entries
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (kg)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BMI</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...weightData].reverse().map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{entry.fullDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{entry.weightKg}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {(entry.weightKg / (userHeightM * userHeightM)).toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WeightProgressPage;

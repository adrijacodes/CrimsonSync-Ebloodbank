import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const EventsCityYearChart = () => {
  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const accessToken = localStorage.getItem('token');

        const response = await fetch('https://crimsonsync-ebloodbank.onrender.com/api/events/city-year-report', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);

        // Extract unique year keys
        const uniqueYears = new Set();
        jsonData.forEach(item => {
          Object.keys(item).forEach(key => {
            if (key !== 'city') {
              uniqueYears.add(key.toString());
            }
          });
        });

        setYears([...uniqueYears].sort());
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchEventData();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Events by City and Year</h2>
      {data.length === 0 ? (
        <p className="text-center">No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            barCategoryGap={30} // Adjusting the gap between bars for better readability
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="city"
              angle={-25}
              textAnchor="end"
              interval={0}
              height={80} // Increasing space for the cities labels
            />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            {years.map((year, idx) => (
              <Bar
                key={year}
                dataKey={year}
                fill={`hsl(${(idx * 60) % 360}, 70%, 60%)`}
                name={`Year ${year}`}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default EventsCityYearChart;

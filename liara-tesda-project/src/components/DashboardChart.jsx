import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";


const DashboardChart = ({ rawData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const today = new Date();
    const days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(today.getDate() - (6 - i));
      return d.toISOString().split("T")[0];
    });

    if(rawData==null)
        return;

    const map = Object.fromEntries(rawData.map(d => [d.date, d.count]));

    const complete = days.map(date => ({
      date,
      count: map[date] || 0
    }));

    setData(complete);
  }, [rawData]);

  return (
    <div className="w-full max-w-2xl mx-auto mt-20">
      <ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis 
      dataKey="date" 
      interval={0} 
      tickFormatter={(date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}`;
      }} 
    />
    <YAxis allowDecimals={false} />
    <Tooltip 
      labelFormatter={(date) => {
        const d = new Date(date);
        return d.toLocaleDateString("en-PH", { month: "long", day: "numeric" });
      }}
    />
    <Bar dataKey="count" fill="#e9fb21" radius={[8, 8, 0, 0]} />
  </BarChart>
</ResponsiveContainer>

    </div>
  );
};

export default DashboardChart;
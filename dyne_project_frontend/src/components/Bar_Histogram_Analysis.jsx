import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Rectangle, Legend } from "recharts";

const RatingAnalysis = ({ title, Data, xKey, yKey, tick = false, barCategoryGap = 6 }) => {
  
  // Clean the data: Remove commas and handle NaN
  const chartArray = useMemo(() => {
    if (!Data?.data || !Array.isArray(Data.data)) return [];

    // taken this code from AI
    return Data.data.map((item) => {
      const rawValue = item[yKey];
      
      // Clean the value: remove commas, then convert to Number
      const cleanValue = typeof rawValue === "string" 
        ? Number(rawValue.replace(/,/g, "")) 
        : Number(rawValue);

      return {
        ...item,
        [yKey]: isNaN(cleanValue) ? 0 : cleanValue, // Fallback to 0 if conversion fails
      };
    });
  }, [Data, yKey]);

  return (
    <div className="lg:w-[49%] w-full min-h-[25vw] lg:p-4 p-2 bg-[#0F172A] border border-gray-600 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-200">
        {title}
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartArray} barCategoryGap={barCategoryGap}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
          <XAxis 
            dataKey={xKey} 
            tick={tick} // Hide labels if product names are too long
            stroke="#94a3b8"
  
          />
          <YAxis 
            dataKey={yKey}
            stroke="#94a3b8" 
            tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
          />
          <Tooltip 
            cursor={{ fill: '#1e293b' }}
            contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #475569', textWrap: true, overflowWrap: 'break-word', wordBreak:'break-word', width:'90%' }}
            formatter={(value) => value.toLocaleString()} // Puts commas back in the tooltip for display
          />
          <Legend />
          <Bar
            dataKey={yKey}
            fill="#818cf8"
            radius={[4, 4, 0, 0]}
            activeBar={<Rectangle fill="#f472b6" stroke="#db2777" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingAnalysis;
import { useState, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const sofiFinancialData = [
  { year: '2017', revenue: 470, netIncome: -120, expenses: 590 },
  { year: '2018', revenue: 560, netIncome: -200, expenses: 760 },
  { year: '2019', revenue: 440, netIncome: -240, expenses: 680 },
  { year: '2020', revenue: 620, netIncome: -224, expenses: 844 },
  { year: '2021', revenue: 1010, netIncome: -484, expenses: 1494 },
  { year: '2022', revenue: 1540, netIncome: -320, expenses: 1860 },
  { year: '2023', revenue: 2070, netIncome: -300, expenses: 2370 },
  { year: '2024', revenue: 2540, netIncome: 86,   expenses: 2454 },
  { year: '2025', revenue: 3120, netIncome: 210,  expenses: 2910 },
  { year: '2026', revenue: 3850, netIncome: 420,  expenses: 3430 }, // Projected current year run-rate
];


// Updated keys to match the new financial fields
const LINE_COLORS = {
  revenue: '#3b82f6',
  expenses: '#f97316',
  netIncome: '#10b981',
};

const DEFAULT_OPACITY = {
  revenue: 1,
  expenses: 1,
  netIncome: 1,
};

const FinancialChart = () => {
  const [opacity, setOpacity] = useState(DEFAULT_OPACITY);
  const [activeKey, setActiveKey] = useState(null);

  const handleMouseEnter = useCallback((o) => {
    const { dataKey } = o;
    if (typeof dataKey === 'string') {
      setOpacity(prev => ({ ...prev, [dataKey]: 0.3 })); // Dims other lines slightly deeper
      setActiveKey(dataKey);
    }
  }, []);

  const handleMouseLeave = useCallback((o) => {
    const { dataKey } = o;
    if (typeof dataKey === 'string') {
      setOpacity(prev => ({ ...prev, [dataKey]: 1 }));
      setActiveKey(null);
    }
  }, []);

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-100">10-Year Fundamental Performance Matrix</h3>
        <p className="text-xs text-slate-400">Chronological telemetry map representing values in Millions ($USD)</p>
      </div>

      {/* Wrapping in a clean container to support responsive grid layouts securely */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={sofiFinancialData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            {/* Custom dark-mode terminal color borders */}
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            
            <XAxis 
              dataKey="year" 
              stroke="#94a3b8" 
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            
            <YAxis 
              stroke="#94a3b8" 
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickFormatter={(value) => `$${value}M`}
            />
            
            {/* Styling the popup hover card container to match layout widgets */}
            <Tooltip 
              contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '8px' }}
              labelStyle={{ color: '#f8fafc', fontWeight: 'bold', fontSize: '12px' }}
              itemStyle={{ fontSize: '12px' }}
            />
            
            <Legend 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
              wrapperStyle={{ pt: 4, fontSize: '12px' }}
            />
            
            {Object.entries(LINE_COLORS).map(([key, color]) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color}
                strokeOpacity={opacity[key]}
                strokeWidth={activeKey === key ? 3 : 2} // Thickens line dynamically on focus!
                dot={{ r: 3, strokeWidth: 1 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinancialChart;
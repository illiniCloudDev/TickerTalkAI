import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CurrentLiabilitiesChart = ({ rawFactsData }) => {
  
  // Clean, filter, and format the data using useMemo so it only calculates when data changes
  const formattedData = useMemo(() => {
    if (!rawFactsData?.facts?.['us-gaap']?.AccruedLiabilitiesCurrent?.units?.USD) {
      return [];
    }

    const rawUnitsArray = rawFactsData.facts['us-gaap'].AccruedLiabilitiesCurrent.units.USD;

    return rawUnitsArray
      // 1. Target only annual reports to get a clean chronological timeline
      .filter(item => item.form === '10-K')
      // 2. Map and format the fields specifically for Recharts
      .map(item => ({
        year: String(item.fy),
        // Convert raw dollars to Millions ($3,736,794 becomes 3.74)
        liabilities: Number((item.val / 1000000).toFixed(2)),
        formType: item.form,
      }))
      // 3. Sort by year ascending just in case the SEC array order is flipped
      .sort((a, b) => a.year.localeCompare(b.year));
  }, [rawFactsData]);

  if (formattedData.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-500 text-xs italic">
        No 10-K current liabilities telemetry found for this entity.
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col justify-between h-full">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
          Current Accrued Liabilities Timeline
        </h3>
        <p className="text-xs text-slate-400">Isolated 10-K historical balances scaled in Millions ($USD)</p>
      </div>

      <div className="w-full h-64 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedData}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            {/* Dark terminal layout grid lines */}
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            
            <XAxis 
              dataKey="year" 
              stroke="#64748b" 
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            
            <YAxis 
              stroke="#64748b" 
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickFormatter={(value) => `$${value}M`}
            />
            
            <Tooltip 
              contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '8px' }}
              labelStyle={{ color: '#f8fafc', fontWeight: 'bold', fontSize: '12px' }}
              itemStyle={{ fontSize: '12px', color: '#f43f5e' }}
              formatter={(value) => [`$${value}M`, 'Accrued Liabilities']}
            />
            
            
            <defs>
              <linearGradient id="liabilitiesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="liabilities"
              stroke="#f43f5e" 
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#liabilitiesGradient)"
              dot={{ r: 3, strokeWidth: 1, fill: '#0f172a' }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CurrentLiabilitiesChart;
import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CurrentLiabilitiesChart = ({ rawFactsData }) => {
  
  // Clean, filter, and format the data using useMemo so it only calculates when data changes
const formattedData = useMemo(() => {
  if (!rawFactsData?.facts?.['us-gaap']) return [];

  const usGaap = rawFactsData.facts['us-gaap'];

  // 1. Define a list of alternative GAAP keys that represent short-term liabilities
  const liabilityTaxonomyFallbacks = [
    'AccruedLiabilitiesCurrent',
    'AccountsPayableAndAccruedLiabilitiesCurrent',
    'AccountsPayableCurrent',
    'OtherLiabilitiesCurrent'
  ];

  let rawUnitsArray = null;
  let activeKeyName = '';

  // 2. Loop through our preferences and grab the first one that actually contains USD array data
  for (const key of liabilityTaxonomyFallbacks) {
    if (usGaap[key]?.units?.USD) {
      rawUnitsArray = usGaap[key].units.USD;
      activeKeyName = key;
      
      // If we are looking at Apple, 'AccruedLiabilitiesCurrent' only goes to 2017. 
      // If we want the FULL timeline, we might want to check if a combined key has MORE total data points.
      // For now, let's break as soon as we find a valid array.
      break;
    }
  }

  // If none of the fallback keys exist, return empty array
  if (!rawUnitsArray) {
    console.warn("⚠️ No short-term liability taxonomy keys matched this entity.");
    return [];
  }

  console.log(`📊 Charting liabilities using active taxonomy key: ${activeKeyName}`);

  const seenYears = new Set();

  return rawUnitsArray
    .filter(item => item.form === '10-K')
    .map(item => ({
      year: String(item.fy),
      liabilities: Number((item.val / 1000000).toFixed(2)),
      filedDate: item.filed 
    }))
    .sort((a, b) => b.filedDate.localeCompare(a.filedDate))
    .filter(item => {
      if (seenYears.has(item.year)) return false;
      seenYears.add(item.year);
      return true;
    })
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
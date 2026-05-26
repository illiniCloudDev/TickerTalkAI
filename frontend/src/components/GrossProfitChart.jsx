import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GrossProfitChart = ({ rawFactsData }) => {
  
  const formattedData = useMemo(() => {
    if (!rawFactsData?.facts?.['us-gaap']) return [];

    const usGaap = rawFactsData.facts['us-gaap'];

    // 1. Define robust accounting taxonomy fallbacks for core profitability
    const profitTaxonomyFallbacks = [
      'GrossProfit',
      'GrossMargin',
      'OperatingIncomeLoss'
    ];

    let rawUnitsArray = null;
    let activeKeyName = '';

    // 2. Extract first matching data stream
    for (const key of profitTaxonomyFallbacks) {
      if (usGaap[key]?.units?.USD) {
        rawUnitsArray = usGaap[key].units.USD;
        activeKeyName = key;
        break;
      }
    }

    if (!rawUnitsArray) {
      console.warn("⚠️ No core gross profit or operating margin taxonomy keys matched this entity.");
      return [];
    }

    const seenYears = new Set();

    // 3. Process, clean duplicates, and handle corporate restatements
    return rawUnitsArray
      .filter(item => item.form === '10-K')
      .map(item => ({
        year: String(item.fy),
        // Scale to Billions ($B) to match standard macro income statements
        profit: Number((item.val / 1000000000).toFixed(2)),
        filedDate: item.filed
      }))
      // Filter out revisions by reading the newest filed data entries first
      .sort((a, b) => b.filedDate.localeCompare(a.filedDate))
      .filter(item => {
        if (seenYears.has(item.year)) return false;
        seenYears.add(item.year);
        return true;
      })
      // Order chronologically from left to right
      .sort((a, b) => a.year.localeCompare(b.year));
  }, [rawFactsData]);

  if (formattedData.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-500 text-xs italic">
        No formal annual gross profit statement telemetry mapped for this corporate entity.
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col justify-between h-full">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
          Annual Gross Profit Margin
        </h3>
        <p className="text-xs text-slate-400">Core manufacturing and service profitability scaled in Billions ($USD)</p>
      </div>

      <div className="w-full h-64 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedData}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            
            <XAxis 
              dataKey="year" 
              stroke="#64748b" 
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            
            <YAxis 
              stroke="#64748b" 
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickFormatter={(value) => `$${value}B`}
            />
            
            <Tooltip 
              contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '8px' }}
              labelStyle={{ color: '#f8fafc', fontWeight: 'bold', fontSize: '12px' }}
              itemStyle={{ fontSize: '12px', color: '#6366f1' }}
              formatter={(value) => [`$${value}B`, 'Gross Profit']}
            />
            
            <defs>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="profit"
              stroke="#6366f1" // Premium indigo theme 
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#profitGradient)"
              dot={{ r: 3, strokeWidth: 1, fill: '#0f172a' }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GrossProfitChart;
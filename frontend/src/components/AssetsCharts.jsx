import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AssetsChart = ({ rawFactsData }) => {
  
  const formattedData = useMemo(() => {
    if (!rawFactsData?.facts?.['us-gaap']) return [];

    const usGaap = rawFactsData.facts['us-gaap'];

    // 1. Define defensive asset taxonomy fallback paths
    const assetTaxonomyFallbacks = [
      'Assets',
      'AssetsCurrent'
    ];

    let rawUnitsArray = null;
    let activeKeyName = '';

    // 2. Locate the first available asset data node array
    for (const key of assetTaxonomyFallbacks) {
      if (usGaap[key]?.units?.USD) {
        rawUnitsArray = usGaap[key].units.USD;
        activeKeyName = key;
        break;
      }
    }

    if (!rawUnitsArray) {
      console.warn("⚠️ No standard total asset taxonomy keys found for this corporation.");
      return [];
    }

    const seenYears = new Set();

    // 3. Clean historical arrays and isolate the macro trend points
    return rawUnitsArray
      .filter(item => item.form === '10-K')
      .map(item => ({
        year: String(item.fy),
        // Map asset scales in Billions
        assets: Number((item.val / 1000000000).toFixed(2)),
        filedDate: item.filed
      }))
      // Filter out accounting revisions by handling the newest filed dates first
      .sort((a, b) => b.filedDate.localeCompare(a.filedDate))
      .filter(item => {
        if (seenYears.has(item.year)) return false;
        seenYears.add(item.year);
        return true;
      })
      // Rearrange chronologically from oldest to newest across the screen
      .sort((a, b) => a.year.localeCompare(b.year));
  }, [rawFactsData]);

  if (formattedData.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-500 text-xs italic">
        No formal annual asset statement telemetry mapped for this ticker.
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col justify-between h-full">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Total Corporate Asset Base
        </h3>
        <p className="text-xs text-slate-400">Long-term capital layout trends scaled in Billions ($USD)</p>
      </div>

      <div className="w-full h-64 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
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
              itemStyle={{ fontSize: '12px', color: '#10b981' }}
              formatter={(value) => [`$${value}B`, 'Total Assets']}
            />
            
            <Line
              type="monotone"
              dataKey="assets"
              stroke="#10b981" 
              strokeWidth={2.5}
              dot={{ r: 3, strokeWidth: 1, fill: '#0f172a' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AssetsChart;
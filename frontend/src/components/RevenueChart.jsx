import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RevenueChart = ({ rawFactsData }) => {
  
  const formattedData = useMemo(() => {
    if (!rawFactsData?.facts?.['us-gaap']) return [];

    const usGaap = rawFactsData.facts['us-gaap'];

    // 1. Define standard revenue taxonomy fallback tracks
    const revenueTaxonomyFallbacks = [
      'RevenueFromContractWithCustomerExcludingAssessedTax',
      'Revenues',
      'SalesRevenueNet',
      'SalesRevenueGoodsNet'
    ];

    let rawUnitsArray = null;
    let activeKeyName = '';

    // 2. Extract the first matching active array
    for (const key of revenueTaxonomyFallbacks) {
      if (usGaap[key]?.units?.USD) {
        rawUnitsArray = usGaap[key].units.USD;
        activeKeyName = key;
        break;
      }
    }

    if (!rawUnitsArray) {
      console.warn("⚠️ No standard revenue taxonomy keys matched this entity.");
      return [];
    }

    const seenYears = new Set();

    // 3. Filter, transform, and handle accounting restatements
    return rawUnitsArray
      .filter(item => item.form === '10-K')
      .map(item => ({
        year: String(item.fy),
        // Scale down to Billions ($B) for revenue, since tech giants post huge numbers
        revenue: Number((item.val / 1000000000).toFixed(2)),
        filedDate: item.filed
      }))
      // Process newest filing dates first to keep restated growth numbers accurate
      .sort((a, b) => b.filedDate.localeCompare(a.filedDate))
      .filter(item => {
        if (seenYears.has(item.year)) return false;
        seenYears.add(item.year);
        return true;
      })
      // Flip back to oldest-to-newest horizontal chronological order
      .sort((a, b) => a.year.localeCompare(b.year));
  }, [rawFactsData]);

  if (formattedData.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-500 text-xs italic">
        No annual 10-K top-line revenue metrics discovered for this ticker.
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col justify-between h-full">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          Annual Top-Line Revenue Growth
        </h3>
        <p className="text-xs text-slate-400">Chronological telemetry scale calculated in Billions ($USD)</p>
      </div>

      <div className="w-full h-64 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
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
              itemStyle={{ fontSize: '12px', color: '#3b82f6' }}
              formatter={(value) => [`$${value}B`, 'Gross Revenue']}
            />
            
            <Bar 
              dataKey="revenue" 
              fill="#3b82f6" // Vibrant blue theme mapping clean revenue generation
              radius={[4, 4, 0, 0]} 
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
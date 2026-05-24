import { useState } from "react";

const FactsSearchBar = ({ setCompanyFactsData }) => {
  const [ticker, setTicker] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeEntity, setActiveEntity] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const cleanQuery = ticker.trim().toUpperCase();
    if (!cleanQuery) return;

    console.log("📡 Fetching Corporate Facts Telemetry for:", cleanQuery);
    setLoading(true);
    
    try {
      const response = await fetch(`http://localhost:8080/api/company/${cleanQuery}`);
      if (!response.ok) throw new Error('Company facts lookup returned a bad response status.');
      
      const data = await response.json();
      
      
      setCompanyFactsData(data);
      
      // Cache structural identity properties locally inside the bar for a quick confirmation readout
      setActiveEntity({
        name: data.entityName,
        cik: data.cik,
        ticker: cleanQuery
      });
    } catch (error) {
      console.error("❌ Corporate Data Fact stream aggregation failed:", error);
    } finally {
      setLoading(false);
    }
  };    
  
  return (
    <div className="w-full bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-800 shadow-xl">
      <div className="mb-4">
        <h2 className="text-base font-bold text-slate-100">XBRL Telemetry Engine</h2>
        <p className="text-xs text-slate-400">Stream core financial balances directly from official regulatory records.</p>
      </div>
      
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter Stock Ticker or CIK (e.g. SOFI, AMZN, 0001818874)"
          className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <button 
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 text-white text-sm px-5 py-2 rounded-lg transition font-medium tracking-wide shadow-md flex items-center justify-center min-w-[90px]"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
          ) : 'Load Metrics'}
        </button>
      </form>

      {/* Minor confirmation readout for the terminal user */}
      {activeEntity && !loading && (
        <div className="mt-3 flex items-center justify-between text-xs font-mono bg-slate-950/60 border border-slate-800/40 px-3 py-1.5 rounded-md text-slate-400">
          <div>
            Active Pipeline: <span className="text-blue-400 font-bold">{activeEntity.name}</span>
          </div>
          <div>
            CIK: <span className="text-slate-500">{String(activeEntity.cik).padStart(10, '0')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FactsSearchBar;
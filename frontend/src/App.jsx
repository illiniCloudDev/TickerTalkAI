import { useState } from 'react';

const App = () => {
  const [cik, setCik] = useState('');
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!cik) return;

    console.log("Searching for:", cik);

    setLoading(true);
    try {
      // We hit backend, which then hits the SEC
      const response = await fetch(`http://localhost:8080/api/company/${cik}`);
      const data = await response.json();
      setCompanyData(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">SEC Filing Explorer</h1>
      
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter CIK (e.g. 1818874)"
          className="flex-1 p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={cik}
          onChange={(e) => setCik(e.target.value)}
        />
        <button 
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {companyData && (
        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold text-blue-900">{companyData.name}</h2>
          <p className="text-slate-600">Ticker: <span className="font-mono">{companyData.tickers?.[0]}</span></p>
          <p className="text-slate-600 text-sm">Exchange: {companyData.exchanges?.[0]}</p>
          
          <div className="mt-4 p-4 bg-slate-900 rounded-lg overflow-hidden">
             <p className="text-green-400 text-xs font-mono">Latest Accession: {companyData.filings?.recent?.accessionNumber?.[0]}</p>
             <h3 className="text-blue-400 text-xs font-bold mb-2 uppercase">Filing Metadata:</h3>
             
             {/* Use Object.keys().map() to safely list out the keys in the filings object */}
             {Object.keys(companyData.filings || {}).map((key) => (
               <p key={key} className="text-green-400 text-xs font-mono">
                 {key}: {typeof companyData.filings[key] === 'object' ? '[Object Data]' : companyData.filings[key]}
               </p>
             ))}

             <hr className="border-slate-700 my-2" />

             {/* Diving deeper into the 'recent' object which contains the actual arrays */}
             <p className="text-green-400 text-xs font-mono">
                Recent Accession: {companyData.filings?.recent?.accessionNumber?.[0]}
             </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
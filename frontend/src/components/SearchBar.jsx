import { useState } from "react";

const SearchBar = ({companyData, setCompanyData}) => {
  const [cik, setCik] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!cik) return;

    console.log("Searching for:", cik);

    setLoading(true);
    try {
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
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-slate-900 text-slate-100 rounded-xl shadow-xl border border-slate-800">
      <h1 className="text-2xl font-bold text-slate-100 mb-4">SEC Filing Explorer</h1>
      
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter CIK or Ticker (e.g. MSFT, 1818874)"
          /* Darkened the input field to match, adjusted focus ring styling */
          className="flex-1 p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={cik}
          onChange={(e) => setCik(e.target.value)}
        />
        <button 
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {companyData && (
        <div className="border-t border-slate-800 pt-4">
          
          {/* Header Row: Company Identity */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-100 tracking-tight">{companyData.name}</h2>
              <p className="text-lg font-semibold text-blue-400 font-mono mt-0.5">
                {companyData.tickers?.[0] || 'N/A'} 
                <span className="text-xs text-slate-400 font-sans font-normal ml-2">on {companyData.exchanges?.[0] || 'Unknown Exchange'}</span>
              </p>
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-500 font-mono">CIK: {companyData.cik}</p>
              <p className="text-xs text-slate-500 font-mono">SIC: {companyData.sic || 'N/A'}</p>
            </div>
          </div>

          {/* Quick Profile Grid for Retail Investors */}
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-y border-slate-800 py-3 text-sm text-slate-300">
            <div>
              <span className="font-semibold block text-xs uppercase tracking-wider text-slate-500">Industry Sector</span> 
              {companyData.sicDescription || 'N/A'}
            </div>
            <div>
              <span className="font-semibold block text-xs uppercase tracking-wider text-slate-500">Fiscal Year End</span> 
              {companyData.fiscalYearEnd ? `${companyData.fiscalYearEnd.slice(0,2)}/${companyData.fiscalYearEnd.slice(2)}` : '12/31'}
            </div>
            <div>
              <span className="font-semibold block text-xs uppercase tracking-wider text-slate-500">Operations (HQ)</span> 
              {companyData.stateOfBusinessDescription || companyData.stateOfBusiness || 'N/A'}
            </div>
            <div>
              <span className="font-semibold block text-xs uppercase tracking-wider text-slate-500">Legal Incorporation</span> 
              {companyData.stateOfIncorporationDescription || companyData.stateOfIncorporation || 'N/A'}
            </div>
          </div>

          {/* Optional Official Website Link */}
          {companyData.website && (
            <div className="mt-3 text-sm">
              <span className="font-medium text-slate-400">Official Website: </span>
              <a 
                href={companyData.website.startsWith('http') ? companyData.website : `https://${companyData.website}`} 
                target="_blank" 
                rel="noreferrer" 
                className="text-blue-400 hover:underline font-mono"
              >
                {companyData.website}
              </a>
            </div>
          )}
          
          {/* Technical Terminal Box - Adjusted background color slightly to stand out from card */}
          <div className="mt-4 p-4 bg-slate-950 rounded-lg overflow-hidden border border-slate-800/60">
             <p className="text-green-400 text-xs font-mono">Latest Accession: {companyData.filings?.recent?.accessionNumber?.[0]}</p>
             <h3 className="text-blue-400 text-xs font-bold mb-2 uppercase tracking-wider">Filing Metadata:</h3>
             
             {Object.keys(companyData.filings || {}).map((key) => (
               <p key={key} className="text-green-400 text-xs font-mono">
                 {key}: {typeof companyData.filings[key] === 'object' ? '[Object Data]' : companyData.filings[key]}
               </p>
             ))}

             <hr className="border-slate-800 my-2" />
             <h3 className="text-blue-400 text-xs font-bold mb-2 uppercase tracking-wider">Insider Owner</h3>
             <p className="text-green-400 text-xs font-mono">
                {String(companyData.insiderTransactionForOwnerExists == 1 ? 'Yes' : 'No')}
             </p>
                          <h3 className="text-blue-400 text-xs font-bold mb-2 uppercase tracking-wider">Insider Issuer</h3>
             <p className="text-green-400 text-xs font-mono">
                {String(companyData.insiderTransactionForIssuerExists == 1 ? 'Yes' : 'No')}
             </p>
             <hr className="border-slate-800 my-2" />

             <h3 className="text-blue-400 text-xs font-bold mb-2 uppercase tracking-wider">Former Company Names:</h3>
             
             {(companyData.formerNames || []).length > 0 ? (
               companyData.formerNames.map((comp, index) => (
                 <div key={comp.name || index} className="mt-2">
                   <p className="text-green-400 text-xs font-mono font-bold">{comp.name}</p>
                   <p className="text-slate-400 text-xs font-mono">
                     <span className="text-blue-400">From:</span> {comp.from} <span className="text-blue-400 ml-2">To:</span> {comp.to}
                   </p>
                   {index < companyData.formerNames.length - 1 && (
                     <hr className="border-slate-800/50 my-2" />
                   )}
                 </div>
               ))
             ) : (
               <p className="text-slate-500 text-xs font-mono italic">No historical name changes found.</p>
             )}

             <hr className="border-slate-800 my-2" />

             <p className="text-green-400 text-xs font-mono">
                Recent Accession: {companyData.filings?.recent?.accessionNumber?.[0]}
             </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
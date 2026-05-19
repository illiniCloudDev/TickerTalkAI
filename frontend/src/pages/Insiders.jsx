import { useState, useEffect } from "react";
import { Users, Plus, Trash2, BookmarkCheck, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";

const Insiders = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  // 1. Load data from localStorage on initial page mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem("tickerTalk_watchlist");
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    } else {
      // Seed some default high-profile institutional rows for a realistic feel
      const defaultData = [
        { id: "1", query: "MSFT", type: "Ticker", addedAt: "2026-05-18" },
        { id: "2", query: "0000089542", type: "CIK", addedAt: "2026-05-19" }
      ];
      setWatchlist(defaultData);
      localStorage.setItem("tickerTalk_watchlist", JSON.stringify(defaultData));
    }
  }, []);

  // 2. Helper to write updates out to local storage
  const saveToStorage = (updatedList) => {
    setWatchlist(updatedList);
    localStorage.setItem("tickerTalk_watchlist", JSON.stringify(updatedList));
  };

  // 3. Add Item Handler with clean validation constraints
  const handleAddItem = (e) => {
    e.preventDefault();
    setError("");
    const cleanQuery = inputValue.trim().toUpperCase();

    if (!cleanQuery) return;

    // Basic syntax check: Is it an alpha ticker or a numeric SEC key?
    const isNumeric = /^\d+$/.test(cleanQuery);
    const type = isNumeric ? "CIK" : "Ticker";

    if (!isNumeric && cleanQuery.length > 5) {
      setError("Standard equity tickers do not exceed 5 characters.");
      return;
    }

    // Check for duplicates
    if (watchlist.some(item => item.query === cleanQuery)) {
      setError(`${cleanQuery} is already saved to your tracker matrix.`);
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      query: cleanQuery,
      type: type,
      addedAt: new Date().toISOString().split("T")[0]
    };

    const updatedList = [newItem, ...watchlist];
    saveToStorage(updatedList);
    setInputValue("");
  };

  // 4. Delete Item Handler
  const handleDeleteItem = (id) => {
    const updatedList = watchlist.filter(item => item.id !== id);
    saveToStorage(updatedList);
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl select-none animate-fadeIn">
      
      {/* Header Info */}
      <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4 mb-6">
        <Users className="h-6 w-6 text-blue-500" />
        <div>
          <h1 className="text-xl font-bold text-slate-100">Insider Core Watchlist</h1>
          <p className="text-xs text-slate-400 mt-0.5">Track persistent executive and beneficial owner registries</p>
        </div>
      </div>

      {/* Input Formulation Form */}
      <form onSubmit={handleAddItem} className="space-y-2 mb-6">
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Add Tracking Registry Target
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter asset ticker or numeric CIK..."
            className="flex-1 p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono uppercase text-sm"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Save Target
          </button>
        </div>
        
        {/* Error Messaging Guard */}
        {error && (
          <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1 animate-pulse">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{error}</span>
          </div>
        )}
      </form>

      {/* Dynamic Data Grid */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Saved Telemetry Targets ({watchlist.length})
        </h3>

        {watchlist.length > 0 ? (
          <div className="border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800">
            {watchlist.map((item) => (
              <div 
                key={item.id} 
                className="p-4 bg-slate-950 flex items-center justify-between group hover:bg-slate-900/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <BookmarkCheck className="h-4 w-4 text-emerald-500" />
                  <div>
                    <span className="font-mono text-base font-bold text-slate-100 tracking-wide">
                      {item.query}
                    </span>
                    <span className="ml-2.5 px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded text-[10px] font-mono font-medium text-slate-400">
                      {item.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-500 font-mono">
                    Saved: {item.addedAt}
                  </span>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-slate-600 hover:text-rose-400 p-1 rounded transition-colors cursor-pointer"
                    title={`Remove ${item.query}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-950/40 border border-dashed border-slate-800 rounded-xl">
            <p className="text-xs text-slate-500 italic">
              Your institutional registry matrix is currently empty. Add metrics targets above to preserve tracking references.
            </p>
          </div>
        )}
      </div>
      
      {/* Simulation Info Note */}
    <div className="mt-6 p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 text-[11px] text-slate-400/80 leading-relaxed flex items-center justify-center gap-2.5 max-w-xl mx-auto">
          <HelpCircle className="h-4 w-4 text-slate-600 flex-shrink-0" />
          <p className="text-center">
            💡 <span className="text-slate-500 italic">Local persistence enabled: These keys are cached to your local browser architecture. CRUD operations are processed locally.</span>{" "}
            <Link 
              to="/guide#clear-storage" 
              className="text-blue-400 font-medium hover:text-blue-300 hover:underline transition-colors ml-1 inline-block"
            >
              See Guide: How to clear Chrome LocalStorage &rarr;
            </Link>
          </p>
        </div>
    </div>
  );
};

export default Insiders;
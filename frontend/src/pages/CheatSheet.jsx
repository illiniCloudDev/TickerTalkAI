import { useState } from "react";
import FactsSearchBar from "../components/FactsSearchBar";
import CurrentLiabilitiesChart from "../components/CurrentLiabilitiesChart";

const CheatSheet = () => {
  // Holds the massive raw JSON payload from the backend route mapping
  const [companyFactsData, setCompanyFactsData] = useState(null);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Page Header Segment */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Financial Cheat Sheet</h1>
        <p className="text-sm text-slate-400">Deep telemetry analytics grid mapped from corporate filings.</p>
      </div>

      {/* TARGETED SEARCH INTEGRATION ROW */}
      <div className="w-full">
        <FactsSearchBar setCompanyFactsData={setCompanyFactsData} />
      </div>

      {/* 4-CHART GRID CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-start">
        
        {/* SLOT 1: Live Liabilities Area Chart (Receives state prop seamlessly!) */}
        <div className="w-full min-h-[360px]">
          <CurrentLiabilitiesChart rawFactsData={companyFactsData} />
        </div>

        {/* SLOT 2: Future Metrics Template */}
        <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl h-[360px] flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100">Chart 2 (Future Metrics)</h3>
            <p className="text-xs text-slate-400">Balance Sheet breakdown coming soon</p>
          </div>
          <div className="flex-1 flex items-center justify-center border border-dashed border-slate-800 rounded-lg mt-4 bg-slate-950/40">
            <span className="text-sm text-slate-500 font-medium tracking-wide animate-pulse">
              ✨ Future Data Stream coming soon...
            </span>
          </div>
        </div>

        {/* SLOT 3: Future Data Template */}
        <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl h-[360px] flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100">Chart 3 (Future Data)</h3>
            <p className="text-xs text-slate-400">Cash Flow allocation telemetry matrix</p>
          </div>
          <div className="flex-1 flex items-center justify-center border border-dashed border-slate-800 rounded-lg mt-4 bg-slate-950/40">
            <span className="text-sm text-slate-500 font-medium tracking-wide animate-pulse">
              ✨ Future Data Stream coming soon...
            </span>
          </div>
        </div>

        {/* SLOT 4: Future Analysis Template */}
        <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl h-[360px] flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100">Chart 4 (Future Analysis)</h3>
            <p className="text-xs text-slate-400">Margin and valuation ratio analysis tracking</p>
          </div>
          <div className="flex-1 flex items-center justify-center border border-dashed border-slate-800 rounded-lg mt-4 bg-slate-950/40">
            <span className="text-sm text-slate-500 font-medium tracking-wide animate-pulse">
              ✨ Future Data Stream coming soon...
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheatSheet;
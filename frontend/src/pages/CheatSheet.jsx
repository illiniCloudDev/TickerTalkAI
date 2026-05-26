import { useState } from "react";
import FactsSearchBar from "../components/FactsSearchBar";
import CurrentLiabilitiesChart from "../components/CurrentLiabilitiesChart";
import RevenueChart from "../components/RevenueChart";
import AssetsChart from "../components/AssetsCharts";
import GrossProfitChart from "../components/GrossProfitChart";

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
        <div className="w-full min-h-[360px]">
          <RevenueChart rawFactsData={companyFactsData}/> 
        </div>

        {/* SLOT 3: Future Data Template */}
        <div className="w-full min-h-[360px]">
          <AssetsChart rawFactsData={companyFactsData}/> 
        </div>

        {/* SLOT 4: Future Analysis Template */}
        <div className="w-full min-h-[360px]">
          <GrossProfitChart rawFactsData={companyFactsData}/> 
        </div>

      </div>
    </div>
  );
};

export default CheatSheet;
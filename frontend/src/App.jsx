import { useState } from "react";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  
  // companyData here so both columns can access it
  const [companyData, setCompanyData] = useState(null);

  // A helper function/render block to swap the main content based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          // DUAL-COLUMN LAYOUT FOR THE HOME TAB 
          <div className="flex flex-col lg:flex-row gap-6 w-full items-start">
            
            {/* LEFT COLUMN: Your search engine and profile card (60% width) */}
            <div className="w-full lg:w-3/5">
              {/* Pass companyData and its setter as props down to SearchBar */}
              <SearchBar companyData={companyData} setCompanyData={setCompanyData} />
            </div>

            {/* RIGHT COLUMN: The New Live Filing Feed (40% width) */}
            <div className="w-full lg:w-2/5 bg-slate-900 border border-slate-800 rounded-xl p-5 sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                <span>📰</span> Recent Filing Feed
              </h2>

              {companyData?.filings?.recent?.form ? (
                <div className="space-y-3">
                  {/* Map through the array of forms dynamically */}
                  {companyData.filings.recent.form.slice(0, 5).map((formType, index) => {
                    const filingDate = companyData.filings.recent.filingDate?.[index];
                    const docDesc = companyData.filings.recent.primaryDocDescription?.[index];
                    
                    return (
                      <div key={index} className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="px-2 py-0.5 bg-blue-900/40 text-blue-400 border border-blue-800 text-xs font-mono font-bold rounded">
                            Form {formType}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">{filingDate}</span>
                        </div>
                        <p className="text-xs text-slate-300 font-medium line-clamp-1">{docDesc || "SEC Submission"}</p>
                        
                        {/* Future AI Summary Container */}
                        <div className="mt-2 pt-2 border-t border-slate-800/60 text-[11px] text-slate-500 italic">
                          ✨ AI Digest placeholder coming soon...
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic text-center py-8">
                  Search for a company to view their latest regulatory submissions.
                </p>
              )}
            </div>

          </div>
        );

      /* Adjusted alternative pages to fit your sleek new dark mode scheme */
      case "documents":
        return (
          <div className="max-w-4xl mx-auto mt-10 p-6 bg-slate-900 text-slate-100 rounded-xl shadow-md border border-slate-800">
            <h1 className="text-2xl font-bold mb-4 text-blue-400">Document Dictionary</h1>
            <p className="text-slate-400">What is a 10-K? What is an 8-K? Find out here.</p>
          </div>
        );
      case "cheatsheet":
        return (
          <div className="max-w-4xl mx-auto mt-10 p-6 bg-slate-900 text-slate-100 rounded-xl shadow-md border border-slate-800">
            <h1 className="text-2xl font-bold mb-4 text-blue-400">Financial Cheat Sheet</h1>
            <p className="text-slate-400">Mastering the Balance Sheet, Income Statement, and Cash Flows.</p>
          </div>
        );
      case "redflags":
        return (
          <div className="max-w-4xl mx-auto mt-10 p-6 bg-slate-900 text-slate-100 rounded-xl shadow-md border border-slate-800">
            <h1 className="text-2xl font-bold mb-4 text-blue-400">Red Flags Checklist</h1>
            <p className="text-slate-400">Keep an eye out for these warning signs in SEC filings.</p>
          </div>
        );
      case "insiders":
        return (
          <div className="max-w-4xl mx-auto mt-10 p-6 bg-slate-900 text-slate-100 rounded-xl shadow-md border border-slate-800">
            <h1 className="text-2xl font-bold mb-4 text-blue-400">Insider Tracker</h1>
            <p className="text-slate-400">Tracking C-Suite stock purchases and Form 4 files.</p>
          </div>
        );
      default:
        return <SearchBar companyData={companyData} setCompanyData={setCompanyData} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar (Fixed Width: 64) */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 pl-64 p-8 overflow-x-hidden">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
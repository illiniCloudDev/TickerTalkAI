import { useState } from "react";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  // A helper function/render block to swap the main content based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <SearchBar />;
      case "documents":
        return (
          <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Document Dictionary</h1>
            <p className="text-slate-600">What is a 10-K? What is an 8-K? Find out here.</p>
          </div>
        );
      case "cheatsheet":
        return (
          <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Financial Cheat Sheet</h1>
            <p className="text-slate-600">Mastering the Balance Sheet, Income Statement, and Cash Flows.</p>
          </div>
        );
      case "redflags":
        return (
          <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Red Flags Checklist</h1>
            <p className="text-slate-600">Keep an eye out for these warning signs in SEC filings.</p>
          </div>
        );
      case "insiders":
        return (
          <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Insider Tracker</h1>
            <p className="text-slate-600">Tracking C-Suite stock purchases and Form 4 files.</p>
          </div>
        );
      default:
        return <SearchBar />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* 1. Sidebar (Fixed Width: 64) */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Main Content Area (Shifted right by 64 to avoid overlap) */}
      <main className="flex-1 pl-64 p-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
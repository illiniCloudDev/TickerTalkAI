import { useState } from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  // Navigation items array to keep the JSX clean
  const navItems = [
    { id: "home", label: "Home", icon: "🔍" },
    { id: "documents", label: "Documents (10-K, etc.)", icon: "📚" },
    { id: "cheatsheet", label: "Financial Cheat Sheet", icon: "📊" },
    { id: "redflags", label: "Red Flags Checklist", icon: "⚠️" },
    { id: "insiders", label: "Insider Tracker", icon: "👥" },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 text-slate-100 flex flex-col fixed left-0 top-0 border-r border-slate-800">
      {/* App Logo / Header */}
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold tracking-wide text-blue-400 flex items-center gap-2">
          <span>📈</span> TickerTalkAI 
        </h2>
        <p className="text-xs text-slate-400 mt-1">Retail Investor Hub</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-900/30 font-semibold"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-800 text-center">
        <p className="text-xs text-slate-500">v1.0.0 — Empowering Retail</p>
      </div>
    </div>
  );
};

export default Sidebar;
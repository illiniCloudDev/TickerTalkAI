import { NavLink } from "react-router-dom";
// Import ultra-clean dashboard icons from lucide-react
import { 
  Search, 
  BookOpen, 
  BarChart4, 
  AlertTriangle, 
  Users, 
  TrendingUp,
  HelpCircle
} from "lucide-react";

const Sidebar = () => {
  // Configured to point directly to your brand-new React Router paths
  const navItems = [
    { to: "/", label: "Home", icon: Search },
    { to: "/guide", label: "User Guide", icon: HelpCircle },
    { to: "/documents", label: "Documents (10-K, etc.)", icon: BookOpen },
    { to: "/cheatsheet", label: "Financial Cheat Sheet", icon: BarChart4 },
    { to: "/redflags", label: "Red Flags Checklist", icon: AlertTriangle },
    { to: "/insiders", label: "Insider Tracker", icon: Users },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 text-slate-100 flex flex-col fixed left-0 top-0 border-r border-slate-800 select-none">
      
      {/* App Logo / Header */}
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold tracking-wide text-blue-400 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-blue-500" />
          <span>TickerTalkAI</span> 
        </h2>
        <p className="text-xs text-slate-400 mt-1">Retail Investor Hub</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          // Destructure the icon component dynamically
          const IconComponent = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              // NavLink automatically checks the path and exposes a boolean 'isActive'
              className={({ isActive }) => `
                w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-900/30 font-semibold"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }
              `}
            >
              {/* Render the matching Lucide icon */}
              <IconComponent className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
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
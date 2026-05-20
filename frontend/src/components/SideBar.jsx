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
          const IconComponent = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-900/30 font-semibold"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }
              `}
            >
              <IconComponent className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Footer Box with Simple Icons GitHub Target Integration */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/20 text-center space-y-2">
        <p className="text-[10px] text-slate-500 tracking-wider uppercase font-mono">
          v1.0.0 — Empowering Retail
        </p>
        
        <div className="pt-1">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer" 
            className="group flex flex-col items-center justify-center p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-950 transition-all duration-200"
          >
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 group-hover:text-blue-400 transition-colors">
              {/* Hardcoded Simple Icons vector element for precise data alignment */}
              <svg 
                role="img" 
                viewBox="0 0 24 24" 
                className="h-3.5 w-3.5 fill-slate-100 group-hover:fill-blue-400 transition-colors duration-200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              <span>Created by <strong className="text-slate-300 font-semibold group-hover:text-blue-400">IlliniDev</strong></span>
            </div>
            <p className="text-[10px] text-slate-500 group-hover:text-slate-400 transition-colors mt-0.5 text-center px-1 leading-tight">
              Visit my GitHub for repository source code & layout instructions!
            </p>
          </a>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
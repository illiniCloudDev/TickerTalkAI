import { Hammer } from "lucide-react";

const InConstruction = ({ title }) => {
  return (
    <div className="max-w-xl mx-auto mt-16 p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col items-center text-center animate-fadeIn select-none">
      
      {/* Animated Icon Ring */}
      <div className="p-4 bg-slate-950 border border-slate-800 rounded-full mb-5 shadow-inner">
        <Hammer className="h-8 w-8 text-blue-500 animate-pulse" />
      </div>

      {/* Dynamic Module Heading */}
      <h1 className="text-xl font-bold text-slate-100 tracking-tight">
        {title || "Module"} Under Construction
      </h1>
      
      <p className="text-sm text-slate-400 mt-2 max-w-xs">
        This terminal feature is currently being wired up. Check back soon for full metrics deployment!
      </p>

      <div className="mt-6 px-3 py-1 bg-blue-950/40 border border-blue-900/60 rounded-full text-[11px] font-mono font-semibold text-blue-400 tracking-wider uppercase">
        ⚡ Status: Building Block
      </div>
    </div>
  );
};

export default InConstruction;
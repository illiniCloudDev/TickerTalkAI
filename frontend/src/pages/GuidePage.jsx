import { BookOpen, Terminal, ShieldCheck, HelpCircle, Settings } from "lucide-react";

const GuidePage = () => {
  return (
    <div className="max-w-3xl mx-auto mt-6 p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl select-none animate-fadeIn">
      <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4 mb-6">
        <BookOpen className="h-6 w-6 text-blue-500" />
        <div>
          <h1 className="text-xl font-bold text-slate-100">Terminal Operational Documentation</h1>
          <p className="text-xs text-slate-400 mt-0.5">Quick-start layout system specifications for retail investment telemetry</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Step 1 */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 h-8 w-8 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center font-mono text-xs font-bold text-blue-400">
            01
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              Query Resolution Matrix
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              The search bar automatically handles raw alpha tickers and translates them into numeric system CIK keys via our internal background bridge synchronization. If entering an alpha code, make sure it corresponds to general public equities on major exchanges.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 h-8 w-8 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center font-mono text-xs font-bold text-blue-400">
            02
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200">
              Understanding the Submissions Feed
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              When a search resolves, the right-hand panel renders a chronological layout mapping the company's 5 most recent regulatory forms:
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2 text-[11px] font-mono">
              <div className="p-2 bg-slate-950 border border-slate-800 rounded text-center">
                <span className="text-blue-400 font-bold block mb-0.5">Form 10-K</span> Annual Report
              </div>
              <div className="p-2 bg-slate-950 border border-slate-800 rounded text-center">
                <span className="text-blue-400 font-bold block mb-0.5">Form 10-Q</span> Quarterly Report
              </div>
              <div className="p-2 bg-slate-950 border border-slate-800 rounded text-center">
                <span className="text-blue-400 font-bold block mb-0.5">Form 8-K</span> Material Events
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 h-8 w-8 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center font-mono text-xs font-bold text-blue-400">
            03
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              Insider Registries
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Check the terminal interface flags for{" "}
              <span className="group tooltip-container">
                Owner/Issuer Existence
                <span className="tooltip-text">Indicates if institutional executives or beneficial owners actively report transaction details for this asset.</span>
              </span>. 
              If flagged "Yes", tracking history can be safely aggregated within the dedicated Insider Tracker module on your sidebar.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-slate-950 rounded-xl border border-slate-800/60 flex items-center gap-3">
        <HelpCircle className="h-5 w-5 text-slate-500 flex-shrink-0" />
        <p className="text-[11px] text-slate-500 italic leading-normal">
          Need deep structural formula analytics? Navigate to the "Financial Cheat Sheet" or the "Red Flags Checklist" inside your navigation column to see specific look-out criteria.
        </p>
      </div>
      {/* START OF NEW BLOCK */}
      <div id="clear-storage" className="mt-8 pt-6 border-t border-slate-800 scroll-mt-6 animate-fadeIn">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2 mb-3">
            <Settings className="h-4 w-4 text-blue-500" /> Google Chrome DevTools: Clearing Local Storage Cache
        </h3>
  
    <p className="text-xs text-slate-400 mb-4 leading-relaxed">
        If you want to completely wipe your saved institutional watchlist targets or reset your dismissed terminal alert banner tracking preferences without waiting for backend migration, you can clear your cached browser states inside Google Chrome manually by following these steps:</p>

    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2.5 font-sans text-xs text-slate-300">
        <div className="flex items-start gap-2">
            <span className="text-blue-500 font-mono font-bold">1.</span>
            <p>Right-click anywhere on the terminal application viewport interface and select <strong className="text-slate-100 font-semibold">Inspect</strong> (or hit <kbd className="px-1 py-0.5 bg-slate-900 border border-slate-700 text-[10px] font-mono rounded text-slate-400 shadow-sm">F12</kbd> / <kbd className="px-1 py-0.5 bg-slate-900 border border-slate-700 text-[10px] font-mono rounded text-slate-400 shadow-sm">Ctrl+Shift+I</kbd>).</p>
        </div>
    
        <div className="flex items-start gap-2">
            <span className="text-blue-500 font-mono font-bold">2.</span>
            <p>Along the top row configuration menu bar of the Developer Console panel that pops out, select the <strong className="text-slate-100 font-semibold">Application</strong> tab header. <span className="text-slate-500 italic">(If hidden, click the double arrows <code className="text-blue-400 font-mono text-[11px]">»</code> to expand the listing).</span></p>
        </div>
    
        <div className="flex items-start gap-2">
            <span className="text-blue-500 font-mono font-bold">3.</span>
            <p>In the left-hand navigation structure dropdown, expand the <strong className="text-slate-100 font-semibold">Local Storage</strong> folder item list and select your active deployment address domain node (<code className="text-green-400 font-mono text-[11px]">http://localhost:5050</code> or your live Render app URL link).</p>
        </div>
    
        <div className="flex items-start gap-2">
            <span className="text-blue-500 font-mono font-bold">4.</span>
            <p>To wipe specific telemetry rows, right-click the key parameter names (<code className="text-blue-400 font-mono text-[11px]">tickerTalk_watchlist</code> or <code className="text-blue-400 font-mono text-[11px]">tickerTalk_banner_dismissed</code>) and click <strong className="text-slate-100 font-semibold">Delete</strong>. Alternatively, clear everything at once by clicking the clear circle icon <strong className="text-rose-400 font-semibold">⦸ (Clear All)</strong> at the very top of the table display panel.</p>
            </div>
        </div>
    </div>
    {/* END OF CONTAINER */}
    </div>

    
        
  );
};

export default GuidePage;
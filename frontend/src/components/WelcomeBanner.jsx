import { useState, useEffect } from "react";
import { Info, X, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const WelcomeBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const bannerDismissed = localStorage.getItem("tickerTalk_banner_dismissed");
    if (bannerDismissed === "true") {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("tickerTalk_banner_dismissed", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 flex items-start justify-between gap-4 animate-fadeIn select-none">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-950/60 border border-blue-900/50 rounded-lg mt-0.5">
          <Info className="h-4 w-4 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
            Welcome to TickerTalkAI Terminal
            <span className="text-[10px] bg-blue-950 text-blue-400 px-1.5 py-0.5 border border-blue-900/40 rounded font-mono">v1.0.0</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            To research an asset, enter an official equity{" "}
            <span className="group tooltip-container">
              Ticker
              <span className="tooltip-text">A unique series of letters representing publicly traded shares (e.g., MSFT or MS).</span>
            </span>{" "}
            or a 10-digit zero-padded{" "}
            <span className="group tooltip-container">
              CIK number
              <span className="tooltip-text">Central Index Key: A unique number assigned by the SEC to identify individual corporate entities.</span>
            </span>{" "}
            into the explorer engine to stream real-time corporate filing telemetry.
          </p>
          <div className="mt-2.5 flex items-center gap-3">
            <Link 
              to="/guide" 
              className="text-[11px] font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              <Sparkles className="h-3 w-3" />
              View Comprehensive Walkthrough Guide &rarr;
            </Link>
          </div>
        </div>
      </div>

      <button 
        onClick={handleDismiss}
        className="text-slate-500 hover:text-slate-300 p-1 rounded-md hover:bg-slate-800/50 transition-all cursor-pointer"
        title="Dismiss notice"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default WelcomeBanner;
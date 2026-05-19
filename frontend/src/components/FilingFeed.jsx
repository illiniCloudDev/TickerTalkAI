import { Newspaper, Sparkles } from "lucide-react";

const FilingFeed = ({ companyData }) => {
  return (
    <div className="w-full lg:w-2/5 bg-slate-900 border border-slate-800 rounded-xl p-5 sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto select-none">
      <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
        <Newspaper className="h-5 w-5 text-blue-400" />
        Recent Filing Feed
      </h2>

      {companyData?.filings?.recent?.form ? (
        <div className="space-y-3">
          {/* Map through the array of forms dynamically (Slicing to top 5) */}
          {companyData.filings.recent.form.slice(0, 5).map((formType, index) => {
            const filingDate = companyData.filings.recent.filingDate?.[index] || "N/A";
            const docDesc = companyData.filings.recent.primaryDocDescription?.[index];
            
            return (
              <div key={index} className="p-3 bg-slate-950 border border-slate-800 rounded-lg hover:border-slate-700/80 transition-all duration-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="px-2 py-0.5 bg-blue-900/40 text-blue-400 border border-blue-800 text-xs font-mono font-bold rounded">
                    Form {formType}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{filingDate}</span>
                </div>
                <p className="text-xs text-slate-300 font-medium line-clamp-1">
                  {docDesc || "SEC Regulatory Submission"}
                </p>
                
                {/* Future AI Summary Container Placeholder */}
                <div className="mt-2 pt-2 border-t border-slate-800/60 text-[11px] text-slate-500 italic flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-slate-600 animate-pulse" />
                  <span>AI Digest placeholder coming soon...</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-xs text-slate-500 italic max-w-[200px]">
            Search for a target company ticker or CIK to map recent regulatory submissions.
          </p>
        </div>
      )}
    </div>
  );
};

export default FilingFeed;
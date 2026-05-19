import { useState } from "react";
import SearchBar from "../components/SearchBar";
import FilingFeed from "../components/FilingFeed";
import WelcomeBanner from "../components/WelcomeBanner";

const HomePage = () => {
  const [companyData, setCompanyData] = useState(null);

  return (

    <div className="w-full max-w-7xl mx-auto space-y-6">
        <div className="w-full">
            <WelcomeBanner />
            <div className="flex flex-col lg:flex-row gap-6 w-full items-start">
            {/* LEFT COLUMN */}
            <div className="w-full lg:w-3/5">
                <SearchBar companyData={companyData} setCompanyData={setCompanyData} />
            </div>
            {/* RIGHT COLUMN */}
            <FilingFeed companyData={companyData} />
        </div>
    </div>
    </div>
  );
};

export default HomePage;
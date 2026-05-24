import axios from 'axios';

// Base headers for general SEC data requests (data.sec.gov)
const BASE_HEADERS = {
  'User-Agent': 'SEC Insight Analytics charlie.posner@gmail.com',
  'Accept-Encoding': 'gzip, deflate'
};

// In-memory runtime cache for mapping tickers to CIK numbers
let tickerMap = {}; 

/**
 * @desc    Syncs the SEC's master ticker list to local server memory on boot.
 * @route   Invoked internally inside server.js
 */
export const syncTickerMap = async () => {
  try {
    const response = await axios.get('https://www.sec.gov/files/company_tickers.json', { 
      headers: {
        'User-Agent': 'SEC Insight Analytics charlie.posner@gmail.com',
        'Accept-Encoding': 'gzip, deflate',
        'Host': 'www.sec.gov' // Crucial for this specific endpoint whitelist
      } 
    });

    const data = response.data;
    const newMap = {}; 
    
    Object.values(data).forEach((item) => {
      newMap[item.ticker.toUpperCase()] = item.cik_str; 
    }); 
    
    tickerMap = newMap;
    console.log('✅ Ticker-to-CIK mapping synced successfully inside controller.');
  } catch (error) {
    console.error('❌ Failed to sync ticker map inside controller:', error.message);
  }
};

/**
 * @desc    Get company identity and submission metadata from SEC EDGAR
 * @route   GET /api/company/:query
 * @access  Public (Will accept protect middleware later)
 */
export const getCompanyFacts = async (req, res) => {
  try {
    let { query } = req.params; 
    query = query.toUpperCase().trim();

    // Check if the query is a ticker in our map; otherwise assume it's a raw CIK
    const targetCik = tickerMap[query] || query;

    // SAFETY GUARD: Block request if map hasn't loaded or ticker doesn't exist
    if (isNaN(targetCik)) {
      return res.status(404).json({ 
        message: `Ticker "${query}" not found. Please check your ticker or wait for map sync.` 
      });
    }

    // SEC systems strictly require a 10-digit zero-padded string
    const paddedCik = String(targetCik).padStart(10, '0');
    const url = `https://data.sec.gov/api/xbrl/companyfacts/CIK${paddedCik}.json`;

    console.log(`📡 Controller fetching COMPANY FACTS for: ${query} -> Padded CIK: ${paddedCik}`);

    const response = await axios.get(url, { headers: BASE_HEADERS });
    
    // Return the raw SEC data payload straight back to your frontend fetch client
    console.log(response.data.facts['us-gaap'].AccruedLiabilitiesCurrent.units['USD'])
    //console.log(response.data.facts['us-gaap'].AccruedLiabilitiesCurrent.units['USD'])

    res.json(response.data);
    
  } catch (error) {
    console.error('❌ SEC Fetch Error inside controller:', error.message);
    res.status(error.response?.status || 500).json({
      message: 'Failed to retrieve COMPANY data via backend bridge',
      error: error.message
    });
  }
};
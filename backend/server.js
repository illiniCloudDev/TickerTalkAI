import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 8080;

// MIDDLEWARE
// Updated to allow requests from Vite frontend on Port 5050
app.use(cors({
  origin: 'http://localhost:5050'
}));
app.use(express.json());

// Base headers for general SEC data requests (data.sec.gov)
const BASE_HEADERS = {
  'User-Agent': 'SEC Insight Analytics charlie.posner@gmail.com',
  'Accept-Encoding': 'gzip, deflate'
};

let tickerMap = {}; 

/**
 * Syncs the SEC's master ticker list to our local memory.
 * Uses domain-specific headers to avoid 404/403 errors.
 */
const syncTickerMap = async () => {
    try {
        const response = await axios.get('https://www.sec.gov/files/company_tickers.json', { 
            headers: {
                'User-Agent': 'SEC Insight Analytics charlie.posner@gmail.com',
                'Accept-Encoding': 'gzip, deflate',
                'Host': 'www.sec.gov' // Crucial for this specific endpoint
            } 
        });

        const data = response.data;
        const newMap = {}; 
        
        Object.values(data).forEach((item) => {
            newMap[item.ticker.toUpperCase()] = item.cik_str; 
        }); 
        
        tickerMap = newMap;
        console.log('✅ Ticker-to-CIK mapping synced successfully.');

    } catch (error) {
        console.error('❌ Failed to sync ticker map:', error.message);
    }
};

// ROUTES
app.get('/api/company/:query', async (req, res) => {
    try {
        let { query } = req.params; 
        query = query.toUpperCase().trim();

        // Check if the query is a ticker in our map; otherwise assume it's a raw CIK
        const targetCik = tickerMap[query] || query;

        // SAFETY GUARD: If the map failed to sync or the ticker doesn't exist, 
        // targetCik will still be letters (like "AMD"). it is blocked here.
        if (isNaN(targetCik)) {
            return res.status(404).json({ 
                message: `Ticker "${query}" not found. Please check your ticker or wait for map sync.` 
            });
        }

        // SEC requires a 10-digit zero-padded string
        const paddedCik = String(targetCik).padStart(10, '0');
        const url = `https://data.sec.gov/submissions/CIK${paddedCik}.json`;

        console.log(`Searching SEC for: ${query} -> Padded CIK: ${paddedCik}`);

        const response = await axios.get(url, { headers: BASE_HEADERS });
        console.log(response.data)
        res.json(response.data);
        
    } catch (error) {
        console.error('SEC Fetch Error:', error.message);
        res.status(error.response?.status || 500).json({
            message: 'Failed to retrieve SEC data',
            error: error.message
        });
    }
});

// START SERVER
app.listen(PORT, async () => {
  console.log(`🚀 Backend bridge running on http://localhost:${PORT}`);
  console.log('Initializing Ticker Map...');
  
  // Wait for the map to load before accepting the first user request
  await syncTickerMap();
  
  console.log(`Listening for requests from http://localhost:5050`);
});
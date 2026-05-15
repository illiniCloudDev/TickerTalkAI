import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

//MIDDLEWARE
app.use(cors({
  origin: 'http://localhost:1000'
}));
app.use(express.json());

// The SEC requires a specific User-Agent format to avoid being blocked.
// Format: 'Company Name ContactEmail'
const SEC_HEADERS = {
  'User-Agent': 'SEC Insight Analytics charlie.posner@gmail.com',
  'Accept-Encoding': 'gzip, deflate',
  'Host': 'data.sec.gov'
};

let tickerMap = {}; 

const syncTickerMap = async () => {
    try {
        
        const response = await axios.get('https://www.sec.gov/files/company_tickers.json', { headers: SEC_HEADERS });
        const data = response.data; 

        console.log(data)

        // organize SEC file 
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

//ROUTES
app.get('/api/company/:query', async (req, res) => {
    try {

        let { query } = req.params; 
        query = query.toUpperCase().trim();

        const targetCik = tickerMap[query] || query;
        const paddedCik = String(targetCik).padStart(10, '0');

        const url = `https://data.sec.gov/submissions/CIK${paddedCik}.json`;

        console.log(`Searching SEC for Ticker/CIK: ${query} -> Padded CIK: ${paddedCik}`);

        //this is where the get request is made to SEC API
        const response = await axios.get(url, { headers: SEC_HEADERS });

        res.json(response.data);
        
    } catch (error) {
        console.error('SEC Fetch Error:', error.message);

        res.status(error.response?.status || 500).json({
            message: 'Failed to retrieve SEC data',
            error: error.message
        });
    }
});

app.listen(PORT, async () => {
  console.log(`🚀 Backend bridge running on http://localhost:${PORT}`);

  console.log('Initializing Ticker Map...')
  await syncTickerMap()
  console.log(`Listening for requests from http://localhost:1000`);
});
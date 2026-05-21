import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import companyRoutes from './routes/company.js';
import { syncTickerMap } from './controllers/companyFacts.js';
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 8080;

// MIDDLEWARE
// Updated to allow requests from Vite frontend on Port 5050
app.use(cors({
  origin: 'http://localhost:5050'
}));
app.use(express.json());

app.use('/api/company', companyRoutes);

// START SERVER
app.listen(PORT, async () => {
  console.log(`🚀 Backend bridge running on http://localhost:${PORT}`);
  console.log('Initializing Ticker Map...');
  
  // Wait for the map to load before accepting the first user request
  await syncTickerMap();
  
  console.log(`Listening for requests from http://localhost:5050`);
});
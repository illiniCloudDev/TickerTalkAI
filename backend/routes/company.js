import express from 'express';
const router = express.Router();

// Import the controller logic (Note the explicit .js extension required for ES Modules)
import { getCompanyData } from '../controllers/company.js';

// Define the route for SEC fetching
router
  .route('/:query')
  .get(getCompanyData);

export default router;
import express from 'express';
const router = express.Router();

// Import the controller logic (Note the explicit .js extension required for ES Modules)
// import { getCompanyData } from '../controllers/company.js';
import { getCompanyFacts } from '../controllers/companyFacts.js';
// Define the route for SEC fetching
router
  .route('/:query')
  .get(getCompanyFacts);

export default router;
import express from 'express';
import controller from '../controllers/QuoteController';

const router = express.Router();

router.get('/quote', controller.getQuote);

export = router;
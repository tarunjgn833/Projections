import express from 'express';
import { getHistogram, getColumns, getHistogramRaw } from '../controllers/histogramController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/Commodity/histogram');
  });
router.get('/all-columns', getColumns);
router.get('/:column/histogram', getHistogram);
router.get('/:column/raw', getHistogramRaw);

export default router;
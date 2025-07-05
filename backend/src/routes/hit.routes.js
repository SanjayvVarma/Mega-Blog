import { Router } from 'express';
import { countHit, totalHits } from '../controllers/hit.controller.js';

const router = Router();

router.get('/count', countHit);
router.get('/total-hits', totalHits);

export default router;
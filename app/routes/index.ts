import { Router } from 'express';
import indexRoute from './index.route.js';
import healthRoute from './health.route.js';
import dbRoute from './db.route.js';
import pokemonRoute from './pokemon.route.js';
import pokemonTypeRoute from './pokemonType.route.js';
import pokemonAttackRoute from './pokemonAttack.route.js';
import trainerRoute from './trainer.route.js';
import gymRoute from './gym.route.js';
import itemRoute from './item.route.js';

const router = Router();

// Mount routes
router.use('/', indexRoute);
router.use('/health', healthRoute);
router.use('/db', dbRoute);
router.use('/api/pokemon', pokemonRoute);
router.use('/api/types', pokemonTypeRoute);
router.use('/api/attacks', pokemonAttackRoute);
router.use('/api/trainers', trainerRoute);
router.use('/api/gyms', gymRoute);
router.use('/api/items', itemRoute);

export default router;

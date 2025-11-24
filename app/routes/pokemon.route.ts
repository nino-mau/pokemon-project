import { Router, Request, Response } from 'express';
import Pokemon from '../models/Pokemon.js';

const router = Router();

// GET all pokemon
router.get('/', async (_req: Request, res: Response) => {
  try {
    const pokemons = await Pokemon.find()
      .populate('type', 'name')
      .populate('attack', 'name power');
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pokemon' });
  }
});

// GET pokemon by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id)
      .populate('type')
      .populate('attack');

    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }

    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pokemon' });
  }
});

// POST create new pokemon
router.post('/', async (req: Request, res: Response) => {
  try {
    const pokemon = new Pokemon(req.body);
    await pokemon.save();
    res.status(201).json(pokemon);
  } catch (error) {
    console.error('[Create Pokemon] ', error);
    res.status(400).json({ error: 'Error creating pokemon' });
  }
});

// PUT update pokemon
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const pokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }

    res.json(pokemon);
  } catch (error) {
    res.status(400).json({ error: 'Error updating pokemon' });
  }
});

// DELETE pokemon
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const pokemon = await Pokemon.findByIdAndDelete(req.params.id);

    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }

    res.json({ message: 'Pokemon deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting pokemon' });
  }
});

export default router;

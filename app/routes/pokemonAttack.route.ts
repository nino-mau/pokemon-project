import { Router, Request, Response } from 'express';
import PokemonAttack from '../models/PokemonAttack.js';

const router = Router();

// GET all attacks
router.get('/', async (_req: Request, res: Response) => {
  try {
    const attacks = await PokemonAttack.find().populate('type', 'name');
    res.json(attacks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching attacks' });
  }
});

// GET attack by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const attack = await PokemonAttack.findById(req.params.id).populate('type');

    if (!attack) {
      return res.status(404).json({ error: 'Attack not found' });
    }

    res.json(attack);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching attack' });
  }
});

// POST create new attack
router.post('/', async (req: Request, res: Response) => {
  try {
    await PokemonAttack.create(req.body);
    res.status(201).json(req.body);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error creating attack' });
  }
});

// PUT update attack
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const attack = await PokemonAttack.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!attack) {
      return res.status(404).json({ error: 'Attack not found' });
    }

    res.json(attack);
  } catch (error) {
    res.status(400).json({ error: 'Error updating attack' });
  }
});

// DELETE attack
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const attack = await PokemonAttack.findByIdAndDelete(req.params.id);

    if (!attack) {
      return res.status(404).json({ error: 'Attack not found' });
    }

    res.json({ message: 'Attack deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting attack' });
  }
});

export default router;

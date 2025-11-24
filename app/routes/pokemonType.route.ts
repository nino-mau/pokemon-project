import { Router, Request, Response } from 'express';
import PokemonType from '../models/PokemonType.js';

const router = Router();

// GET all types
router.get('/', async (_req: Request, res: Response) => {
  try {
    const types = await PokemonType.find();
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching types' });
  }
});

// GET type by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const type = await PokemonType.findById(req.params.id);
    
    if (!type) {
      return res.status(404).json({ error: 'Type not found' });
    }
    
    res.json(type);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching type' });
  }
});

// POST create new type
router.post('/', async (req: Request, res: Response) => {
  try {
    const type = new PokemonType(req.body);
    await type.save();
    res.status(201).json(type);
  } catch (error) {
    res.status(400).json({ error: 'Error creating type' });
  }
});

// PUT update type
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const type = await PokemonType.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!type) {
      return res.status(404).json({ error: 'Type not found' });
    }
    
    res.json(type);
  } catch (error) {
    res.status(400).json({ error: 'Error updating type' });
  }
});

// DELETE type
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const type = await PokemonType.findByIdAndDelete(req.params.id);
    
    if (!type) {
      return res.status(404).json({ error: 'Type not found' });
    }
    
    res.json({ message: 'Type deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting type' });
  }
});

export default router;

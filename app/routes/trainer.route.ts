import { Router, Request, Response } from 'express';
import Trainer from '../models/Trainer.js';

const router = Router();

// GET all trainers
router.get('/', async (_req: Request, res: Response) => {
  try {
    const trainers = await Trainer.find()
      .populate('activePokemons', 'name')
      .populate('capturedPokemons', 'name')
      .populate('items', 'name');
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching trainers' });
  }
});

// GET trainer by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const trainer = await Trainer.findById(req.params.id)
      .populate('activePokemons')
      .populate('capturedPokemons')
      .populate('items');
    
    if (!trainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }
    
    res.json(trainer);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching trainer' });
  }
});

// POST create new trainer
router.post('/', async (req: Request, res: Response) => {
  try {
    const trainer = new Trainer(req.body);
    await trainer.save();
    res.status(201).json(trainer);
  } catch (error) {
    res.status(400).json({ error: 'Error creating trainer' });
  }
});

// PUT update trainer
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!trainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }
    
    res.json(trainer);
  } catch (error) {
    res.status(400).json({ error: 'Error updating trainer' });
  }
});

// DELETE trainer
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    
    if (!trainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }
    
    res.json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting trainer' });
  }
});

export default router;

import { Router, Request, Response } from 'express';
import Gym from '../models/Gym.js';

const router = Router();

// GET all gyms
router.get('/', async (_req: Request, res: Response) => {
  try {
    const gyms = await Gym.find()
      .populate('type', 'name')
      .populate('trainers', 'name');
    res.json(gyms);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching gyms' });
  }
});

// GET gym by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const gym = await Gym.findById(req.params.id)
      .populate('type')
      .populate('trainers');
    
    if (!gym) {
      return res.status(404).json({ error: 'Gym not found' });
    }
    
    res.json(gym);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching gym' });
  }
});

// POST create new gym
router.post('/', async (req: Request, res: Response) => {
  try {
    const gym = new Gym(req.body);
    await gym.save();
    res.status(201).json(gym);
  } catch (error) {
    res.status(400).json({ error: 'Error creating gym' });
  }
});

// PUT update gym
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const gym = await Gym.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!gym) {
      return res.status(404).json({ error: 'Gym not found' });
    }
    
    res.json(gym);
  } catch (error) {
    res.status(400).json({ error: 'Error updating gym' });
  }
});

// DELETE gym
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const gym = await Gym.findByIdAndDelete(req.params.id);
    
    if (!gym) {
      return res.status(404).json({ error: 'Gym not found' });
    }
    
    res.json({ message: 'Gym deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting gym' });
  }
});

export default router;

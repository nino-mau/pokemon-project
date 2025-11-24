import { Router, Request, Response } from 'express';
import { getDB } from '../config/database.js';
import Pokemon from '../models/Pokemon.js';
import mongoose from 'mongoose';

const router = Router();

// Test database connection endpoint
router.get('/test', async (_req: Request, res: Response) => {
  try {
    getDB(); // Verify connection

    // Get connection info
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database not connected');
    }

    const adminDb = db.admin();
    const serverInfo = await adminDb.serverInfo();
    const stats = await db.stats();

    res.json({
      success: true,
      message: 'MongoDB connection successful',
      data: {
        serverVersion: serverInfo.version,
        database: db.databaseName,
        collections: stats.collections,
        dataSize: stats.dataSize,
        indexes: stats.indexes
      }
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Example: Get all Pokemon
router.get('/pokemon', async (_req: Request, res: Response) => {
  try {
    getDB(); // Verify connection

    // Fetch pokemon with populated types and attacks
    const pokemon = await Pokemon.find()
      .limit(10)
      .populate('type', 'name weaknesses resistances')
      .populate('attack', 'name description power accuracy')
      .lean();

    res.json({
      success: true,
      count: pokemon.length,
      data: pokemon
    });
  } catch (error) {
    console.error('Error fetching pokemon:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pokemon',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;

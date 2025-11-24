import { connectTestDB, closeTestDB, clearTestDB } from './setup';
import Pokemon from '../app/models/Pokemon';
import PokemonType from '../app/models/PokemonType';

describe('Pokemon Model', () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterAll(async () => {
    await closeTestDB();
  });

  beforeEach(async () => {
    await clearTestDB();
  });

  it('should create a valid Pokemon', async () => {
    const type = await PokemonType.create({
      name: 'Fire',
      weaknesses: ['Water'],
      resistances: ['Grass']
    });

    const pokemon = await Pokemon.create({
      name: 'Charmander',
      type: [type._id],
      attack: [],
      size: 0.6,
      weight: 8.5,
      sex: 'male',
      description: 'A fire type starter',
      category: 'Lizard'
    });

    expect(pokemon.name).toBe('Charmander');
    expect(pokemon.size).toBe(0.6);
    expect(pokemon.sex).toBe('male');
  });

  it('should fail without required fields', async () => {
    const pokemon = new Pokemon({
      name: 'Invalid'
    });

    await expect(pokemon.save()).rejects.toThrow();
  });

  it('should not allow duplicate names', async () => {
    const type = await PokemonType.create({
      name: 'Fire',
      weaknesses: [],
      resistances: []
    });

    await Pokemon.create({
      name: 'Pikachu',
      type: [type._id],
      attack: [],
      size: 0.4,
      weight: 6,
      sex: 'female',
      description: 'Electric mouse',
      category: 'Mouse'
    });

    const duplicate = new Pokemon({
      name: 'Pikachu',
      type: [type._id],
      attack: [],
      size: 0.5,
      weight: 7,
      sex: 'male',
      description: 'Another one',
      category: 'Mouse'
    });

    await expect(duplicate.save()).rejects.toThrow();
  });
});

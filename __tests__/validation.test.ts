import { isValidPokemonName, calculatePokemonStats, getPokemonTypeEffectiveness } from '../app/utils/validation';

describe('Validation Utils', () => {
  describe('isValidPokemonName', () => {
    it('should accept valid names', () => {
      expect(isValidPokemonName('Pikachu')).toBe(true);
      expect(isValidPokemonName('Charmander')).toBe(true);
      expect(isValidPokemonName('Mr. Mime')).toBe(true);
    });

    it('should reject empty names', () => {
      expect(isValidPokemonName('')).toBe(false);
    });

    it('should reject names that are too long', () => {
      const longName = 'a'.repeat(51);
      expect(isValidPokemonName(longName)).toBe(false);
    });
  });

  describe('calculatePokemonStats', () => {
    it('should calculate BMI correctly', () => {
      const result = calculatePokemonStats(10, 1);
      expect(result.bmi).toBe(10);
    });

    it('should categorize as Heavy', () => {
      const result = calculatePokemonStats(50, 1);
      expect(result.category).toBe('Heavy');
    });

    it('should categorize as Light', () => {
      const result = calculatePokemonStats(10, 1);
      expect(result.category).toBe('Light');
    });

    it('should categorize as Normal', () => {
      const result = calculatePokemonStats(25, 1);
      expect(result.category).toBe('Normal');
    });
  });

  describe('getPokemonTypeEffectiveness', () => {
    it('should return super effective multiplier', () => {
      expect(getPokemonTypeEffectiveness('Fire', 'Grass')).toBe(2);
      expect(getPokemonTypeEffectiveness('Water', 'Fire')).toBe(2);
    });

    it('should return not very effective multiplier', () => {
      expect(getPokemonTypeEffectiveness('Fire', 'Water')).toBe(0.5);
      expect(getPokemonTypeEffectiveness('Water', 'Grass')).toBe(0.5);
    });

    it('should return no effect multiplier', () => {
      expect(getPokemonTypeEffectiveness('Electric', 'Ground')).toBe(0);
    });

    it('should return neutral multiplier for unknown types', () => {
      expect(getPokemonTypeEffectiveness('Fire', 'Rock')).toBe(1);
      expect(getPokemonTypeEffectiveness('Unknown', 'Unknown')).toBe(1);
    });
  });
});

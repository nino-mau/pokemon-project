// app/utils/validation.ts

export function isValidPokemonName(name: string): boolean {
  return name.length > 0 && name.length <= 50;
}

export function calculatePokemonStats(weight: number, size: number): { bmi: number; category: string } {
  const bmi = weight / (size * size);
  
  let category = 'Normal';
  if (bmi > 30) category = 'Heavy';
  if (bmi < 20) category = 'Light';
  
  return { bmi, category };
}

export function getPokemonTypeEffectiveness(attackType: string, defenderType: string): number {
  const effectivenessChart: Record<string, Record<string, number>> = {
    'Fire': { 'Grass': 2, 'Water': 0.5, 'Fire': 0.5 },
    'Water': { 'Fire': 2, 'Grass': 0.5, 'Water': 0.5 },
    'Grass': { 'Water': 2, 'Fire': 0.5, 'Grass': 0.5 },
    'Electric': { 'Water': 2, 'Grass': 0.5, 'Ground': 0 }
  };

  return effectivenessChart[attackType]?.[defenderType] ?? 1;
}

import { connectDB, closeDB } from './config/database.js';
import PokemonType from './models/PokemonType.js';
import PokemonAttack from './models/PokemonAttack.js';
import Pokemon from './models/Pokemon.js';

const seedDatabase = async () => {
  try {
    console.log('Starting database seed...');
    await connectDB();

    // Clear existing data
    await PokemonType.deleteMany({});
    await PokemonAttack.deleteMany({});
    await Pokemon.deleteMany({});
    console.log('Cleared existing data');

    // Seed Pokemon Types
    const fireType = await PokemonType.create({
      name: 'Fire',
      weaknesses: ['Water', 'Ground', 'Rock'],
      resistances: ['Fire', 'Grass', 'Ice', 'Bug', 'Steel', 'Fairy']
    });

    const waterType = await PokemonType.create({
      name: 'Water',
      weaknesses: ['Electric', 'Grass'],
      resistances: ['Fire', 'Water', 'Ice', 'Steel']
    });

    const grassType = await PokemonType.create({
      name: 'Grass',
      weaknesses: ['Fire', 'Ice', 'Poison', 'Flying', 'Bug'],
      resistances: ['Water', 'Electric', 'Grass', 'Ground']
    });

    const electricType = await PokemonType.create({
      name: 'Electric',
      weaknesses: ['Ground'],
      resistances: ['Electric', 'Flying', 'Steel']
    });

    const psychicType = await PokemonType.create({
      name: 'Psychic',
      weaknesses: ['Bug', 'Ghost', 'Dark'],
      resistances: ['Fighting', 'Psychic']
    });

    const dragonType = await PokemonType.create({
      name: 'Dragon',
      weaknesses: ['Ice', 'Dragon', 'Fairy'],
      resistances: ['Fire', 'Water', 'Electric', 'Grass']
    });

    const flyingType = await PokemonType.create({
      name: 'Flying',
      weaknesses: ['Electric', 'Ice', 'Rock'],
      resistances: ['Grass', 'Fighting', 'Bug']
    });

    const poisonType = await PokemonType.create({
      name: 'Poison',
      weaknesses: ['Ground', 'Psychic'],
      resistances: ['Grass', 'Fighting', 'Poison', 'Bug', 'Fairy']
    });

    console.log('Seeded 8 Pokemon types');

    // Seed Pokemon Attacks
    const flamethrower = await PokemonAttack.create({
      name: 'Flamethrower',
      description: 'The target is scorched with an intense blast of fire.',
      type: fireType._id,
      power: 90,
      accuracy: 100
    });

    const ember = await PokemonAttack.create({
      name: 'Ember',
      description: 'The target is attacked with small flames.',
      type: fireType._id,
      power: 40,
      accuracy: 100
    });

    const fireBlast = await PokemonAttack.create({
      name: 'Fire Blast',
      description:
        'The target is attacked with an intense blast of all-consuming fire.',
      type: fireType._id,
      power: 110,
      accuracy: 85
    });

    const hydroPump = await PokemonAttack.create({
      name: 'Hydro Pump',
      description: 'The target is blasted by a huge volume of water.',
      type: waterType._id,
      power: 110,
      accuracy: 80
    });

    const waterGun = await PokemonAttack.create({
      name: 'Water Gun',
      description: 'The target is blasted with a forceful shot of water.',
      type: waterType._id,
      power: 40,
      accuracy: 100
    });

    const bubbleBeam = await PokemonAttack.create({
      name: 'Bubble Beam',
      description: 'A spray of bubbles is forcefully ejected at the target.',
      type: waterType._id,
      power: 65,
      accuracy: 100
    });

    const vineWhip = await PokemonAttack.create({
      name: 'Vine Whip',
      description: 'The target is struck with slender whiplike vines.',
      type: grassType._id,
      power: 45,
      accuracy: 100
    });

    const solarBeam = await PokemonAttack.create({
      name: 'Solar Beam',
      description:
        'A two-turn attack where sunlight is absorbed in the first turn.',
      type: grassType._id,
      power: 120,
      accuracy: 100
    });

    const thunderbolt = await PokemonAttack.create({
      name: 'Thunderbolt',
      description: 'A strong electric blast crashes down on the target.',
      type: electricType._id,
      power: 90,
      accuracy: 100
    });

    const thunderShock = await PokemonAttack.create({
      name: 'Thunder Shock',
      description: 'A jolt of electricity is hurled at the target.',
      type: electricType._id,
      power: 40,
      accuracy: 100
    });

    const psychic = await PokemonAttack.create({
      name: 'Psychic',
      description: 'The target is hit by a strong telekinetic force.',
      type: psychicType._id,
      power: 90,
      accuracy: 100
    });

    const dragonClaw = await PokemonAttack.create({
      name: 'Dragon Claw',
      description: 'The user slashes the target with huge, sharp claws.',
      type: dragonType._id,
      power: 80,
      accuracy: 100
    });

    console.log('Seeded 12 Pokemon attacks');

    // Seed Pokemon
    await Pokemon.create({
      name: 'Charizard',
      type: [fireType._id, flyingType._id],
      attack: [flamethrower._id, fireBlast._id, ember._id],
      size: 1.7,
      weight: 90.5,
      sex: 'male',
      description:
        'Charizard flies around the sky in search of powerful opponents. It breathes fire of such great heat that it melts anything.',
      category: 'Flame'
    });

    await Pokemon.create({
      name: 'Blastoise',
      type: [waterType._id],
      attack: [hydroPump._id, waterGun._id, bubbleBeam._id],
      size: 1.6,
      weight: 85.5,
      sex: 'male',
      description:
        'Blastoise has water spouts that protrude from its shell. The water spouts are very accurate and can shoot bullets of water with enough accuracy to strike empty cans from a distance of over 160 feet.',
      category: 'Shellfish'
    });

    await Pokemon.create({
      name: 'Venusaur',
      type: [grassType._id, poisonType._id],
      attack: [solarBeam._id, vineWhip._id],
      size: 2.0,
      weight: 100.0,
      sex: 'female',
      description:
        "There is a large flower on Venusaur's back. The flower is said to take on vivid colors if it gets plenty of nutrition and sunlight.",
      category: 'Seed'
    });

    await Pokemon.create({
      name: 'Pikachu',
      type: [electricType._id],
      attack: [thunderbolt._id, thunderShock._id],
      size: 0.4,
      weight: 6.0,
      sex: 'male',
      description:
        "Whenever Pikachu comes across something new, it blasts it with a jolt of electricity. If you come across a blackened berry, it's evidence that this Pokémon mistook the intensity of its charge.",
      category: 'Mouse'
    });

    await Pokemon.create({
      name: 'Mewtwo',
      type: [psychicType._id],
      attack: [psychic._id],
      size: 2.0,
      weight: 122.0,
      sex: 'male',
      description:
        "Mewtwo is a Pokémon that was created by genetic manipulation. However, even though the scientific power of humans created this Pokémon's body, they failed to endow Mewtwo with a compassionate heart.",
      category: 'Genetic'
    });

    await Pokemon.create({
      name: 'Dragonite',
      type: [dragonType._id, flyingType._id],
      attack: [dragonClaw._id],
      size: 2.2,
      weight: 210.0,
      sex: 'female',
      description:
        'Dragonite is capable of circling the globe in just 16 hours. It is a kindhearted Pokémon that leads lost and foundering ships in a storm to safety.',
      category: 'Dragon'
    });

    await Pokemon.create({
      name: 'Squirtle',
      type: [waterType._id],
      attack: [waterGun._id, bubbleBeam._id],
      size: 0.5,
      weight: 9.0,
      sex: 'male',
      description:
        "Squirtle's shell is not merely used for protection. The shell's rounded shape and the grooves on its surface help minimize resistance in water, enabling this Pokémon to swim at high speeds.",
      category: 'Tiny Turtle'
    });

    await Pokemon.create({
      name: 'Bulbasaur',
      type: [grassType._id, poisonType._id],
      attack: [vineWhip._id],
      size: 0.7,
      weight: 6.9,
      sex: 'female',
      description:
        "Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger.",
      category: 'Seed'
    });

    console.log('Seeded 8 Pokemon');

    console.log('\n=== Database Seeded Successfully! ===');
    console.log('Types: 8');
    console.log('Attacks: 12');
    console.log('Pokemon: 8');
    console.log('\nYou can now query the database using the API endpoints.');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await closeDB();
  }
};

// Run the seed
seedDatabase()
  .then(() => {
    console.log('Seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });

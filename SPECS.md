## 🎯 Objectif du projet

Créer une API REST en Node.js + Express avec MongoDB (Mongoose) pour gérer un mini-univers Pokémon.

## 🧩 Éléments à modéliser

### 1. Pokémon

- nom (String)
- types[] (références vers Types)
- attaques[] (références vers Attaques)
- taille (Number)
- poids (Number)
- description (String)
- sexe (String / enum)
- evolutions[] (références vers d'autres Pokémon)

### 2. Types

- nom
- faiblesses[] (références vers Types)
- resistances[] (références vers Types)

### 3. Attaques

- nom
- type (référence vers Type)
- puissance (Number)
- precision (Number)
- description

### 4. Dresseur

- nom
- pokemons_actifs[] (ObjectId de Pokémon capturés)
- pokemons_captures[] (ObjectId)
- objets[] (références vers Objets)

### 5. Arènes

- nom
- type (référence vers Type principal)
- dresseur[] (références vers Dresseurs)

### 6. Objets

- nom
- categories
- description

## 📦 Simplification

- Pas de niveaux
- Attaques génériques (pas propres à chaque Pokémon)
- Objectif : API CRUD complète

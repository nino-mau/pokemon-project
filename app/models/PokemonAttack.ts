import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPokemonAttack extends Document {
  name: string;
  description: string;
  type: Types.ObjectId;
  power: number;
  accuracy: number;
}

const PokemonAttackSchema = new Schema<IPokemonAttack>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      unique: true
    },
    description: {
      type: Schema.Types.String,
      required: true
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: 'PokemonType',
      required: true
    },
    power: {
      type: Schema.Types.Number,
      required: true,
      min: 0
    },
    accuracy: {
      type: Schema.Types.Number,
      required: true,
      min: 0,
      max: 100
    }
  },
  {
    timestamps: true,
    collection: 'pokemon_attacks'
  }
);

export default mongoose.model<IPokemonAttack>(
  'PokemonAttack',
  PokemonAttackSchema
);

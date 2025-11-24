import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPokemonType extends Document {
  name: string;
  weaknesses: string[];
  resistances: string[];
}

const PokemonTypeSchema = new Schema<IPokemonType>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      unique: true
    },
    weaknesses: {
      type: [Schema.Types.String],
      required: true,
      default: []
    },
    resistances: {
      type: [Schema.Types.String],
      required: true,
      default: []
    }
  },
  {
    timestamps: true,
    collection: 'pokemon_types'
  }
);

export default mongoose.model<IPokemonType>('PokemonType', PokemonTypeSchema);

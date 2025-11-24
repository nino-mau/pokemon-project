import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPokemon extends Document {
  name: string;
  type: Types.ObjectId[];
  attack: Types.ObjectId[];
  size: number;
  weight: number;
  sex: 'male' | 'female';
  description: string;
  category: string;
}

const PokemonSchema = new Schema<IPokemon>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      unique: true
    },
    type: {
      type: [Schema.Types.ObjectId],
      ref: 'PokemonType',
      required: true
    },
    attack: {
      type: [Schema.Types.ObjectId],
      ref: 'PokemonAttack',
      required: true,
      default: []
    },
    size: {
      type: Schema.Types.Number,
      required: true,
      min: 0
    },
    weight: {
      type: Schema.Types.Number,
      required: true,
      min: 0
    },
    sex: {
      type: Schema.Types.String,
      required: true,
      enum: ['male', 'female']
    },
    description: {
      type: Schema.Types.String,
      required: true
    },
    category: {
      type: Schema.Types.String,
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'pokemon'
  }
);

export default mongoose.model<IPokemon>('Pokemon', PokemonSchema);

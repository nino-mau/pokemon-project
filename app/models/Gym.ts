import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IGym extends Document {
  name: string;
  type: Types.ObjectId;
  trainers: Types.ObjectId[];
}

const GymSchema = new Schema<IGym>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      unique: true
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: 'PokemonType',
      required: true
    },
    trainers: {
      type: [Schema.Types.ObjectId],
      ref: 'Trainer',
      default: []
    }
  },
  {
    timestamps: true,
    collection: 'gyms'
  }
);

export default mongoose.model<IGym>('Gym', GymSchema);

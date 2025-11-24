import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITrainer extends Document {
  name: string;
  activePokemons: Types.ObjectId[];
  capturedPokemons: Types.ObjectId[];
  items: Types.ObjectId[];
}

const TrainerSchema = new Schema<ITrainer>(
  {
    name: {
      type: Schema.Types.String,
      required: true
    },
    activePokemons: {
      type: [Schema.Types.ObjectId],
      ref: 'Pokemon',
      default: []
    },
    capturedPokemons: {
      type: [Schema.Types.ObjectId],
      ref: 'Pokemon',
      default: []
    },
    items: {
      type: [Schema.Types.ObjectId],
      ref: 'Item',
      default: []
    }
  },
  {
    timestamps: true,
    collection: 'trainers'
  }
);

export default mongoose.model<ITrainer>('Trainer', TrainerSchema);

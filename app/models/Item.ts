import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  name: string;
  category: string;
  description: string;
}

const ItemSchema = new Schema<IItem>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      unique: true
    },
    category: {
      type: Schema.Types.String,
      required: true
    },
    description: {
      type: Schema.Types.String,
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'items'
  }
);

export default mongoose.model<IItem>('Item', ItemSchema);

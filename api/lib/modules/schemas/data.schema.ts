import { Schema, model, Document } from 'mongoose';
import { IData } from "../models/data.model";

interface IDataDocument extends IData, Document {}

export const DataSchema: Schema = new Schema({
   temperature: { type: Number, required: true },
   pressure: { type: Number, required: true },
   humidity: { type: Number, required: true },
   readingDate: { type: Date, default: Date.now },
   deviceId: {type: Number, required: true},
   location: {type: String, required: true}
});

// Pre-save hook to ensure location consistency
DataSchema.pre<IDataDocument>('save', async function(next) {
  const doc = this;
  // Find the most recent document for the same deviceId
  const mostRecentDoc = await model<IDataDocument>('Params_Dawids').findOne({ deviceId: doc.deviceId }).sort({ readingDate: -1 }).exec();
  if (mostRecentDoc && doc.isNew) {
    // If found, set the location of the current document to match the most recent one
    doc.location = mostRecentDoc.location;
  }
  next();
});

export default model<IDataDocument>('Params_Dawids', DataSchema);
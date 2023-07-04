import mongoose, { Schema, Document, Model, Types } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import autopopulate from "mongoose-autopopulate";

export interface Category extends Document {
  name: string;
  description: string;
}

const categoriesSchema: Schema<Category> = new Schema<Category>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    unique: true,
    required: true,
  },
});

categoriesSchema.plugin(
  uniqueValidator,
  "Error, expected {PATH} to be unique."
);
categoriesSchema.plugin(autopopulate);

const categoriesModel: Model<Category> = mongoose.model<Category>(
  "categories",
  categoriesSchema
);

export default categoriesModel;

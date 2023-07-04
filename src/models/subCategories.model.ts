import mongoose, { Schema, Document, Model, Types } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import autopopulate from "mongoose-autopopulate";

export interface SubCategories extends Document {
  catRefId: Types.ObjectId;
  name: string;
  description?: string;
}

const subCategoriesSchema: Schema<SubCategories> = new Schema({
  catRefId: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: true,
    ref: "categories",
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

subCategoriesSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

subCategoriesSchema.plugin(autopopulate);

const SubCategoriesModel: Model<SubCategories> =
  mongoose.model<SubCategories>("subCategories", subCategoriesSchema);

export default SubCategoriesModel;

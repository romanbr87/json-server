import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import autopopulate from 'mongoose-autopopulate';

type tel = { tel: string, owner?: string }
type Location = "" | "north" | "south" | "center" | "yosh";

type Snif = {
    catRefId: Types.ObjectId,
    name?: String,
    tel: [tel],
    whatsapp?: [string], 
    email?: [string],
    location: Location,
    city: string
    address: string,
}

interface Orgs extends Document {
  org_name: string, 
  web_link: [string], 
  facebook_link: [string], 
  linkedIn_link?: [string], 
  instagram_link?: [string],
  email: [string], 
  tel?: [tel], 
  whatsapp?: [tel], 
  location: Location,
  address?: String,
  snifim?: [Snif]
}

const orgSchema: Schema<Orgs> = new mongoose.Schema<Orgs>({
});

orgSchema.plugin(uniqueValidator, 'Error, expected {PATH} to be unique.');
orgSchema.plugin(autopopulate);

const orgsModel: Model<Orgs> = mongoose.model<Orgs>('orgs', orgSchema);

export default orgsModel;

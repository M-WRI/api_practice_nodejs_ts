import { Document, Schema, model } from "mongoose";

export interface IProfile extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  // address: IAddress;
}

export interface IAddress extends Document {
  streetName: string;
  email: string;
  number: string;
  zipCode: string;
  city: string;
  country: string;
}

const addressSchema = new Schema({
  streetName: {
    type: String,
    required: true,
    default: "",
  },
  number: {
    type: String,
    required: true,
    default: "",
  },
  zipCode: {
    type: String,
    required: true,
    default: "",
  },
  city: {
    type: String,
    required: true,
    default: "",
  },
  country: {
    type: String,
    required: true,
    default: "",
  },
});

const profileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  firstName: {
    type: String,
    required: true,
    default: "",
  },
  lastName: {
    type: String,
    required: true,
    default: "",
  },
  birthdate: {
    type: String,
    required: true,
    default: "",
  },
  // address: {
  //   type: addressSchema,
  //   required: true,
  // },
});

export const Profile = model<IProfile>("Profile", profileSchema);

import mongoose, { Schema, Types } from "mongoose";

const companySchema = new Schema({
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  industry: String,
  address: String,
  numberOfEmployees: {
    from: {
      type: String,
    },
    to: {
      type: String,
    },
  
  },
  companyEmail: {
    type: String,
    unique: true,
    required: true,
  },

  companyHR: {
    type: Types.ObjectId,
    ref: "User",
  },
});

export const Company = mongoose.model("Company", companySchema);

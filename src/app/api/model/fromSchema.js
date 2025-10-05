import mongoose, { Schema, models, model } from "mongoose";

const fromSchema = new Schema({
  userId: { type: String, required: true },
  formId: { type: String, required: true, unique: true },
  formStatus: { type: Boolean, default: false },
  formTitle: { type: String, required: true },
  formDescription: { type: String, default: "" },
  formImage: { type: String, default: "" },
  formCTA: { type: String, default: "" },
  formSlug: { type: String, default: "Basic" },
  collectEmail: { type: Boolean, default: true },
  collectPhone: { type: Boolean, default: false },
});

export const FromModel = models.From || model("From", fromSchema);

import mongoose, { Schema, models, model } from "mongoose";

const WhatsAppSchema = new Schema({
  userId: { type: String, required: true },
  Phone: { type: String, required: true },
  Message: { type: String, required: true },
  WhatsappStatus: { type: Boolean, default: false },
}, { timestamps: true });

export const WhatsAppQSchema = models.WhatsApp || model("WhatsApp", WhatsAppSchema);

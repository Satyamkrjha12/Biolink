import mongoose from "mongoose";

const WhatsAppSchema = new mongoose.Schema({
  userId: { type: String, ref: "User", required: true },
  Phone: {type: String, required: true},
  Message: {type: String, required: true},
  WhatappStatus: {type: Boolean, required: true},
});

// ✅ Prevent model overwrite in development
export const WhatsAppQSchema = mongoose.models.WhatsAppQSchema || mongoose.model("WhatsAppQSchema", WhatsAppSchema);

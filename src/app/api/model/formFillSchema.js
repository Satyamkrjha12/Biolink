import mongoose from "mongoose";

const formFillSchema = new mongoose.Schema({
  userId: { type: String, ref: "User", required: true },
  formId: { type: String, ref: "Form", required: true },
  formTitle: { type: String, ref: "Form", required: true },
  ResponseNumber: { type: Number, required: true },
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  Phone: { type: String },
  Message: { type: String },
  Date: { type: String, required: true },
});

// ✅ Prevent model overwrite in development
export const formFill =
  mongoose.models.FormFill || mongoose.model("FormFill", formFillSchema);

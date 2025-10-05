import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "../config/db";
import { EmailModel } from "../model/EmailAutomateSchema";
import { FromModel } from "../model/fromSchema";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const {
      userId,
      formId,
      subject,
      preview,
      body: emailBody,
      EmailStatus, // ✅ keep PascalCase consistent
    } = body;

    if (!userId || !formId) {
      return NextResponse.json(
        { success: false, message: "userId and formId are required" },
        { status: 400 }
      );
    }

    // ✅ Find form entry for given userId & formId
    const entry = await FromModel.findOne({ userId, formId });

    if (!entry) {
      return NextResponse.json(
        { success: false, message: "Form entry not found" },
        { status: 404 }
      );
    }

    // ✅ Create Email doc
    const emailDoc = new EmailModel({
      userId,
      formId,
      EmailStatus, // ✅ consistent
      formTitle: entry.formTitle,
      formDescription: entry.formDescription || "",
      formImage: entry.formImage || "",
      subject: subject || "",
      preview: preview || "Basic",
      body: emailBody || "",
    });

    await emailDoc.save();

    return NextResponse.json(
      { success: true, message: "Email saved successfully", data: emailDoc },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving email:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}


export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const formId = searchParams.get("formId");

    let query = {};
    if (userId) query.userId = userId;
    if (formId) query.formId = formId;

    // ✅ Try fetching emails
    const emails = await EmailModel.find(query);

    if (emails && emails.length > 0) {
      return NextResponse.json({ success: true, data: emails }, { status: 200 });
    }

    // ✅ If no emails, try fetching form details
    if (userId && formId) {
      const entry = await FromModel.findOne({ userId, formId });
      if (entry) {
        const data = {
          formId: entry.formId,
          formTitle: entry.formTitle,
          formDescription: entry.formDescription || "",
          formImage: entry.formImage || "",
          body: "",
          subject: "",
          preview: "",
          EmailStatus: false,
        };
        return NextResponse.json({ success: true, data: [data] }, { status: 200 });
      }
    }

    // ✅ Nothing found
    return NextResponse.json({ success: true, data: [] }, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ success: true, data: [] }, { status: 200 });
  }
}


// ✅ PUT API - Update email by ID
export async function PUT(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { emailId, subject, preview, body: emailBody, EmailStatus } = body;

    if (!emailId) {
      return NextResponse.json(
        { success: false, message: "emailId is required" },
        { status: 400 }
      );
    }

    const updatedEmail = await EmailModel.findByIdAndUpdate(
      emailId,
      {
        ...(subject && { subject }),
        ...(preview && { preview }),
        ...(emailBody && { body: emailBody }),
        ...(EmailStatus !== undefined && { EmailStatus }),
      },
      { new: true }
    );

    if (!updatedEmail) {
      return NextResponse.json(
        { success: false, message: "Email not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Email updated successfully",
        data: updatedEmail,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating email:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

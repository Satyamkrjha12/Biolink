import { NextResponse } from "next/server";
import dbConnect from "../config/db";
import { formFill } from "../model/formFillSchema";
import { EmailModel } from "../model/EmailAutomateSchema";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    // Validate required fields
    if (!body.userId?.trim() || !body.formId?.trim()) {
      return NextResponse.json(
        { success: false, message: "userId and formId are required" },
        { status: 400 }
      );
    }

    // Find the latest ResponseNumber for this form
    const lastEntry = await formFill
      .findOne({ userId: body.userId, formId: body.formId })
      .sort({ ResponseNumber: -1 })
      .lean();

    // Assign next ResponseNumber
    body.ResponseNumber = lastEntry ? lastEntry.ResponseNumber + 1 : 1;

    // Prepare data
    const data = {
      ...body,
      Date: new Date().toISOString().split("T")[0],
    };

    // Send email if needed
    // if (body.Email) {
    //   const emailData = await EmailModel.findOne({
    //     userId: body.userId,
    //     formId: body.formId,
    //   });

    //   if (emailData?.EmailStatus === true) {
    //     try {
    //       const transporter = nodemailer.createTransport({
    //         host: process.env.SMTP_HOST,
    //         port: Number(process.env.SMTP_PORT),
    //         secure: Number(process.env.SMTP_PORT) === 465,
    //         auth: {
    //           user: process.env.SMTP_USER,
    //           pass: process.env.SMTP_PASS,
    //         },
    //       });

    //       const info = await transporter.sendMail({
    //         from: `"No Reply" <${process.env.SMTP_USER}>`,
    //         to: body.Email,
    //         subject: emailData.subject || "No Subject",
    //         html: emailData.body || "<p>Thank you for filling the form.</p>",
    //       });

    //       console.log("Email sent: %s", info.messageId);
    //     } catch (emailErr) {
    //       console.error("Email sending error:", emailErr);
    //     }
    //   }
    // }

    // Create the new form fill entry
    const newEntry = await formFill.create(data);

    return NextResponse.json({ success: true, data: newEntry }, { status: 201 });
  } catch (err) {
    console.error("Database Error Details:", err);
    return NextResponse.json(
      { success: false, message: "Database error", error: err.message },
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

    // Validate query params
    if (!userId || !formId) {
      return NextResponse.json(
        { success: false, message: "userId and formId are required" },
        { status: 400 }
      );
    }

    // Fetch form fills for the given user & form
    const entries = await formFill
      .find({ userId, formId })
      .sort({ ResponseNumber: -1 }) // latest first
      .lean();

    return NextResponse.json({ success: true, data: entries }, { status: 200 });
  } catch (err) {
    console.error("GET API Error:", err);
    return NextResponse.json(
      { success: false, message: "Database error", error: err.message },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import dbConnect from "../config/db";
import { WhatsAppQSchema } from "../model/WhatsAppQuickSchema";

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();

    if (!data.userId?.trim()) {
      return NextResponse.json(
        { success: false, error: "userId is required" },
        { status: 400 }
      );
    }

    const newEntry = await WhatsAppQSchema.create(data);

    return NextResponse.json(
      { success: true, data: newEntry },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("userId");

    if (!uid) {
      return NextResponse.json(
        { success: false, message: "userId query parameter is required" },
        { status: 400 }
      );
    }

    // Search in DB
    const data = await WhatsAppQSchema.findOne({ userId: uid }).lean();

    if (!data) {
      // ✅ Return static fallback data if not found
      const staticData = {
        userId: uid,
        Phone: "",
        Message: "Hello !!!",
        WhatappStatus: false,
      };

      return NextResponse.json(
        {
          success: true,
          data: staticData,
          message: "No record found, static data returned",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: true, data, message: "Record found" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching WhatsApp data:", err);
    return NextResponse.json(
      { success: false, message: "Database error", error: err.message },
      { status: 500 }
    );
  }
}

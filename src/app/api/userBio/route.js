import { NextResponse } from "next/server";
import dbConnect from "../config/db";
import { UserBio } from "../model/userBioSchema";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const UId = searchParams.get("Id");

    if (!UId) {
      return NextResponse.json(
        { error: "Id query parameter is required" },
        { status: 400 }
      );
    }

    const userData = await UserBio.findOne({ Id: UId });

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Server error while fetching user data" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    const data = await req.json();

    const maxUser = await UserBio.find().sort({ Id: -1 }).limit(1);
    const lastId = maxUser.length === 0 ? 0 : parseInt(maxUser[0].Id, 10);
    const newId = (lastId + 1).toString();

    const userBio = new UserBio({ Id: newId, ...data });

    await userBio.save();

    return NextResponse.json(
      { message: "User bio created successfully", Id: newId },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to create user bio" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await dbConnect();

    const data = await req.json();

    // Check if Id is provided
    if (!data.Id) {
      return NextResponse.json({ error: "Id is required" }, { status: 400 });
    }

    // Find and update the user by Id
    const updatedUser = await UserBio.findOneAndUpdate(
      { Id: data.Id },
      data,
      { new: true, overwrite: true } // Overwrite the entire document
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Server error while updating user" },
      { status: 500 }
    );
  }
}

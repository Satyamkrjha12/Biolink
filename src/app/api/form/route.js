import { NextResponse } from "next/server";
import { FromModel } from "../model/fromSchema";
import dbConnect from "../config/db";



export async function PUT(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const formId = data.formId;

    let newFormId;

    // Generate new formId if not provided
    if (!formId || formId === "") {
      const lastForm = await FromModel.findOne().sort({ formId: -1 }).limit(1);
      newFormId = lastForm ? parseInt(lastForm.formId) + 1 : 1;
    }

    // Check if form exists
    let formData = await FromModel.findOne({ formId });

    if (!formData) {
      // Create new form
      const newForm = new FromModel({
        userId: data.userId,
        formId: newFormId,
        formStatus: data.formStatus, // ✅ Respect true or false
        formTitle: data.formTitle || "",
        formDescription: data.formDescription || "",
        formImage: data.formImage || "",
        formCTA: data.formCTA || "",
        formSlug: data.formSlug || "Basic",
        collectEmail: data.collectEmail || true,
        collectPhone: data.collectPhone || false,
      });

      await newForm.save();
      return NextResponse.json(newForm, { status: 200 });
    } else {
      // Update existing form
      formData.formTitle = data.formTitle ?? formData.formTitle;
      formData.formStatus = data.formStatus; // ✅ Proper boolean check
      formData.formDescription =
        data.formDescription ?? formData.formDescription;
      formData.formImage = data.formImage ?? formData.formImage;
      formData.formCTA = data.formCTA ?? formData.formCTA;
      formData.formSlug = data.formSlug ?? formData.formSlug;
      formData.collectEmail = data.collectEmail ?? formData.collectEmail;
      formData.collectPhone = data.collectPhone ?? formData.collectPhone;

      await formData.save();
      return NextResponse.json(formData, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId query parameter is required" },
        { status: 400 }
      );
    }

    const formDataList = await FromModel.find({ userId });

    if (!formDataList || formDataList.length === 0) {
      return NextResponse.json({ error: "No forms found" }, { status: 404 });
    }

    // Convert empty image strings to null
    const cleanedData = formDataList.map((item) => ({
      ...item.toObject(),
      formImage: item.formImage || null,
    }));

    return NextResponse.json(cleanedData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const formId = searchParams.get("formId");

    if (!formId) {
      return NextResponse.json(
        { error: "formId query parameter is required" },
        { status: 400 }
      );
    }

    const deletedForm = await FromModel.findOneAndDelete({ formId });
    if (!deletedForm) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Form deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

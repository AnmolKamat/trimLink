import { clg, linksModel } from "@/utils/Mongo";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { link, text } = await req.json();
  try {
    const textResult = await linksModel.find({ link });
    const linkResult = await linksModel.find({ text });
    if (textResult.length > 0) {
      return NextResponse.json(
        { message: "Text already Exists" },
        { status: 401 }
      );
    }
    if (linkResult.length > 0) {
      return NextResponse.json(
        { message: "Link already Exists" },
        { status: 401 }
      );
    }
    const newDoc = new linksModel({ link, text });
    newDoc.save();
    return NextResponse.json(
      {
        message: "Added Link",
        response: newDoc,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 401 });
  }
};

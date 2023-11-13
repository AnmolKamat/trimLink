import { linksModel } from "@/utils/Mongo";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { text } = await req.json();
  console.log("adding", 1);

  try {
    const textResult = await linksModel.findOne({ text });
    console.log("adding2", textResult);
    if (textResult) {
      return NextResponse.json(
        { message: "Link Found", link: textResult.link },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ message: "Link Not Found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "error while getting the link",
        error,
      },
      { status: 401 }
    );
  }
};

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { userId } = body;

  try {
    const response = await axios.get(
      `https://v1.userbase.com/v1/admin/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.USERBASE_ACCESS_TOKEN}`,
        },
      }
    );

    console.log(response.data); // The user data will be available here
    return NextResponse.json({ response: response.data });
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

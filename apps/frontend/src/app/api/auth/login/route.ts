import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId, password } = await request.json();
    const response = await fetch(
      "http://eb-rds-nest-backend-server-env.eba-ku7j8aa9.us-east-1.elasticbeanstalk.com/auth/login",
      //"http://localhost:4000/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return new NextResponse(JSON.stringify(data), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error while logging in:", error); // <-- Log actual error
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId, password } = await request.json();
    const response = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      return new NextResponse(JSON.stringify(data), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }
    const headers = new Headers();
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      headers.append("set-cookie", setCookie);
    }

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

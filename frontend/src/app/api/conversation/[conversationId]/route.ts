import { auth0 } from "@/lib/auth0";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,  { params }: { params: Promise<{ conversationId: string }> }) {
  try {
    const session = await auth0.getSession();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const token = await auth0.getAccessToken();
    const { conversationId } = await params
    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversation/${conversationId}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token.token}`
      }
    });
    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
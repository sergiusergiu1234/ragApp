import { auth0 } from "@/lib/auth0";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ conversationId: string }> }) {
    try {
        const token = await auth0.getAccessToken()
        console.log(token)
        const { conversationId } = await params
        console.log(conversationId)
        const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversation/${conversationId}`, {
          method: 'GET',
          headers: {
           "Authorization": `Bearer ${token.token}`
          }
        });
        const data = await backendRes.json();
        return NextResponse.json(data);

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Error" }, { status: 500 });
    }
}


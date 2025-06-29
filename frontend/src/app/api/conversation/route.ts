import { auth0 } from "@/lib/auth0";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: {params: { conversationId: String}}) {
    try {
        const token = await auth0.getAccessToken()
        console.log(token)
        const backendRes = await fetch(`http://localhost:8000/conversation`, {
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

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const token = await auth0.getAccessToken()
        console.log(token)
        const backendRes = await fetch(`http://localhost:8000/conversation?conversationTitle=${body.conversationTitle}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
            "Authorization": `Bearer ${token.token}`
          },
          body: JSON.stringify(body)
        });
        const data = await backendRes.json();
        return NextResponse.json(data);

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Error" }, { status: 500 });
    }
}
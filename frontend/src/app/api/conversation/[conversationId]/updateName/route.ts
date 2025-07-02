import { auth0 } from "@/lib/auth0";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, { params }: { params: Promise<{ conversationId: string }> }) {
    try {
        const body = await req.json();
        const token = await auth0.getAccessToken()
        const { conversationId } = await params
        const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversation/${conversationId}/rename?newName=${body.newName}`, {
            method: 'POST',
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
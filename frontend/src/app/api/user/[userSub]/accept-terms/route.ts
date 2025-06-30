import { auth0 } from "@/lib/auth0";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ userSub: string }> }) {
    try {
        const token = await auth0.getAccessToken()
        const { userSub } = await params
        
        const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userSub}/accept-terms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token.token}`
            }
        });
        
        if (!backendRes.ok) {
            return NextResponse.json({ error: "Failed to accept terms" }, { status: backendRes.status });
        }
        
        const data = await backendRes.json();
        return NextResponse.json(data);

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Error accepting terms" }, { status: 500 });
    }
} 
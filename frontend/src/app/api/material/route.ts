import { auth0 } from "@/lib/auth0";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = await auth0.getAccessToken()
        const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/material`, {
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
        const body = await req.formData()
        const token = await auth0.getAccessToken()
        const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/material`, {
          method: 'POST',
          headers: {
            "Authorization": `Bearer ${token.token}`
          },
          body: body
        });
        const data = await backendRes.json();
        return NextResponse.json(data);

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Error" }, { status: 500 });
    }
}


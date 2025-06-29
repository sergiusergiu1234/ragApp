import { auth0 } from "@/lib/auth0";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req: NextRequest,  { params }: { params: Promise<{ materialId: string }> }){
    try {
        const token = await auth0.getAccessToken()
        const { materialId } = await params
        const backendRes = await fetch(`http://localhost:8000/material/${materialId}`, {
          method: 'DELETE',
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
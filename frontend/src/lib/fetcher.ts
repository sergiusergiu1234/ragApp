import { auth0 } from "@/lib/auth0";
import { getAccessToken } from "@auth0/nextjs-auth0";


export const fetcher = async (url: string, method: string = 'GET', body?: any) => {
    let headers: Record<string, string> = {};
    let fetchBody: any = undefined;
    if (body) {
        if (body instanceof FormData) {
            fetchBody = body;
        } else {
            headers['Content-Type'] = 'application/json';
            
            fetchBody = JSON.stringify(body);
        }
    }
  
    console.log(url)
    const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}${url}`, {
        method,
        headers ,
        ...(fetchBody && { body: fetchBody })
    })
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json()
}

import { auth0 } from "@/lib/auth0";
import { getAccessToken } from "@auth0/nextjs-auth0";

const API_URL = 'http://localhost:3000';  // Your backend URL
export const fetcher = async (url: string, method: string = 'GET', body?: any) => {
    let headers: Record<string, string> = {};
    let fetchBody: any = undefined;
    if (body) {
        if (body instanceof FormData) {
            // Let the browser set the Content-Type for FormData
            fetchBody = body;
        } else {
            headers['Content-Type'] = 'application/json';
            
            fetchBody = JSON.stringify(body);
        }
    }

    const res = await fetch(`${API_URL}${url}`, {
        method,
        headers ,
        ...(fetchBody && { body: fetchBody })
    })
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json()
}

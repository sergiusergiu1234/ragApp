import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import useSWR, { mutate } from "swr";

export type SubmitMessageBody = {
    llmId: number,
    conversationId: number,
    modelId: string,
    message: string
}

export type Message = {
    id: number,
    text: string,
    role:string,   
}

export const useMessages = (conversationId:number | null) =>{
    const {
        data: messages,
        error,
        isLoading,
        mutate
    } = useSWR<Message[]>(
        conversationId ? `/api/conversation/${conversationId}` : null,
        fetcher
    )

    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [uploadError, setUploadError] = useState<string | null>(null)

    const createMessage = async (message: string, llmId: number, sourceIds: number[], conversationId: number)=>{
        setIsUploading(true)
        setUploadError(null)
        
        try {
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/chat`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "message": message,
                    "llmId": llmId,
                    "sourceIds": sourceIds,
                    "conversationId": conversationId
                })
            })
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
            }
            
            await mutate()
            return response
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to send message'
            setUploadError(errorMessage)
            throw err
        } finally {
            setIsUploading(false)
        }
    }

    const retryUpload = () => {
        setUploadError(null)
    }
    
    return {
        messages,
        isLoading,
        isError: error,
        createMessage,
        isUploading,
        uploadError,
        retryUpload
    }
}
'use client'
import { getAccessToken } from "@auth0/nextjs-auth0";
import useSWR from "swr"
import { Message } from "./useMessages"
import { fetcher } from "@/lib/fetcher";


// Types
export type Conversation = {
    id: number
    title: string
    pgmessages: Message[]
}

// API endpoints
const API_ENDPOINTS = {
    conversations: '/api/conversation',
    conversation: (id: number) => `/api/conversation/${id}`,
} as const


export const useConversations = () => {
    const {
        data: conversations,
        error,
        isLoading,
        mutate
    } = useSWR<Conversation[]>(
        '/api/conversation',
        fetcher
    )

    const createConversation = async (title: string) => {
        const newConversation = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/conversation`, 
           { method : 'POST',
            body: JSON.stringify({
                "conversationTitle": title
        })})
        await mutate() 
        return newConversation
        
    }


    return {
        conversations,
        isLoading,
        isError: error,
        createConversation,
    }
}

// Hook for single conversation
export const useConversation = (id: number) => {
    const {
        data: conversation,
        error,
        isLoading,
        mutate
    } = useSWR<Conversation>(
        `/api/conversation/${id}`,
        fetcher
    )

    return {
        conversation,
        isLoading,
        isError: error,
        mutate
    }
}
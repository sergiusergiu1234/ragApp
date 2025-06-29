import { fetcher } from "@/lib/fetcher"
import useSWR from "swr"
import { useState, useEffect } from "react"

export type InternalUser ={
    id: number,
    oauthId: string,
    dateCreated: Date,
    acceptedTerms: boolean
}

const TERMS_ACCEPTANCE_KEY = 'ragapp_terms_accepted'

export const useInternalUser = (userSub: string | undefined)=>{
    const [localTermsAccepted, setLocalTermsAccepted] = useState<boolean>(true)

    const {
        data: internalUser,
        error,
        isLoading,
        mutate
    } = useSWR<InternalUser>(
        userSub ? `/api/user/${userSub}` : null,
        fetcher
    )

    // Check if we're on the client side
    useEffect(() => {
        const localAcceptance = localStorage.getItem(TERMS_ACCEPTANCE_KEY) === 'true'
        setLocalTermsAccepted(localAcceptance)
    }, [])

   

    // Set LocalStorage terms acceptance
    const setLocalTermsAcceptance = (accepted: boolean) => {
        if (accepted) {
            localStorage.setItem(TERMS_ACCEPTANCE_KEY, 'true')
            setLocalTermsAccepted(true)
        } else {
            localStorage.removeItem(TERMS_ACCEPTANCE_KEY)
            setLocalTermsAccepted(false)
        }
    }

    // Check if user has accepted terms (database OR localStorage)
    const hasAcceptedTerms = (): boolean => {
        return internalUser?.acceptedTerms || localTermsAccepted
    }

    const removeInternalUser = async (userSub: string | undefined)=>{
        const deletedDocument = await fetcher(
            `/api/material/${userSub}`,'DELETE'
        )
        await mutate()
        return deletedDocument
    }

    const acceptTerms = async (userSub?: string) => {
        try {
            // Set LocalStorage immediately for better UX
            setLocalTermsAcceptance(true)
            
            // Try to update database (only if user is logged in and exists)
            if (userSub && internalUser) {
                const response = await fetch(`/api/user/${userSub}/accept-terms`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                
                if (!response.ok) {
                    console.warn('Failed to save terms acceptance to database, but LocalStorage is set')
                } else {
                    console.log('Terms acceptance saved to database')
                }
            } else {
                console.log('User not logged in or doesn\'t exist yet - using LocalStorage only')
            }
            
            await mutate()
            return true
        } catch (error) {
            console.error('Error accepting terms:', error)
            // Even if database fails, LocalStorage is set
            return true
        }
    }

    return {
        internalUser,
        isLoading,
        isError: error,
        removeInternalUser,
        acceptTerms,
        hasAcceptedTerms
    }
}
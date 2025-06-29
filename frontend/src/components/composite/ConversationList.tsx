import { Conversation, useConversations } from "@/hooks/useConversations"
import ConversationCard from "./ConversationCard"
import { Button } from "../ui/button"
import { useState } from "react"
import { useUser } from "@auth0/nextjs-auth0"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export interface ConversationListProps {
    selectedConversationId: number | null
    handleSelectConversation: (conversationId: number) => void
}

const ConversationList = ({selectedConversationId,handleSelectConversation}: ConversationListProps) =>{
    const {user} = useUser()
    const { conversations, isLoading, createConversation } = useConversations()
    
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full ">
                <div className="text-gray-500">Loading conversations...</div>
            </div>
        )
    }
    const handleCreateConversation = async () =>{
        await createConversation("newChat")
    }

    

    return (
        <div className="flex flex-col w-full space-y-4">
            {/* New Chat Button */}
            <Tooltip>
                {user ? (
                    
                        <Button
                            disabled={false}
                            onClick={handleCreateConversation}
                            className="hover:cursor-pointer w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-4 rounded-xl text-lg transition-all shadow-md"
                        >
                            New chat
                        </Button>
                    
                ) : (
                    <TooltipTrigger asChild>
                        <span className="w-full block hover:cursor-not-allowed">
                            <Button
                                disabled
                                tabIndex={-1}
                                aria-disabled="true"
                                className="w-full  bg-gray-400 text-white font-semibold py-4 rounded-xl text-lg transition-all shadow-md opacity-60 cursor-not-allowed"
                            >
                                New chat
                            </Button>
                        </span>
                    </TooltipTrigger>
                )}
                <TooltipContent>
                    <p>you must log in to use this feature </p>
                </TooltipContent>
            </Tooltip>
            
            
            {/* Conversations List */}
            <div className="flex-1 space-y-2 min-h-0">
                {conversations && conversations.map((c) => (
                    <div 
                        key={c.id} 
                        onClick={() => handleSelectConversation(c.id)}
                        className="cursor-pointer transition-all hover:scale-[1.02] w-full"
                    >
                        <ConversationCard 
                            key={c.id} 
                            id={c.id} 
                            title={c.title} 
                            pgmessages={c.pgmessages} 
                            isSelected={c.id === selectedConversationId}
                        />
                    </div>
                ))}
                
                {(!conversations || conversations.length === 0) && (
                    <div className="text-center text-gray-500 py-8">
                        No conversations yet
                    </div>
                )}
            </div>
        </div>
    )
}

export default ConversationList
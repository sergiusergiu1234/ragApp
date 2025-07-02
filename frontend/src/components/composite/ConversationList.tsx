import { Conversation, useConversations } from "@/hooks/useConversations"
import ConversationCard from "./ConversationCard"
import { Button } from "../ui/button"
import { useState } from "react"
import { useUser } from "@auth0/nextjs-auth0"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { randomInt } from "crypto"
import RenameConversationComponent from "./RenameConversationComponent"

export interface ConversationListProps {
    selectedConversationId: number | null
    handleSelectConversation: (conversationId: number) => void
}

const ConversationList = ({selectedConversationId,handleSelectConversation}: ConversationListProps) =>{
    const {user} = useUser()
    const { conversations, isLoading, createConversation } = useConversations()
    const [renamingId, setRenamingId] = useState<number | null >(null)
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

           {user ? <>
            {renamingId !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                    <RenameConversationComponent
                        conversationId={renamingId}
                        onDone={() => setRenamingId(null)}
                    />
                    </div>
                </div>
                )}
            {/* Conversations List */}
            <div className="flex-1 space-y-2 min-h-0">
                {conversations && conversations.map((c) => (
                    <div 
                        key={c.id} 
                        onClick={() => handleSelectConversation(c.id)}
                        className="cursor-pointer transition-all hover:scale-[1.02] w-full"
                    >
                        <ConversationCard 
                        onRename={() => setRenamingId(c.id)}
                            key={c.id} 
                            id={c.id} 
                            title={c.title} 
                            isSelected={c.id === selectedConversationId}
                        />
                    </div>
                ))}
                
                { user && (!conversations || conversations.length === 0) && (
                    <div className="text-center text-gray-500 py-8">
                        No conversations yet
                    </div>
                )}
            </div></> : <>
            {/* <ConversationCard isSelected={true} title={"Temporary Chat"} id={5}/> */}
            </>}
           
        </div>
    )
}

export default ConversationList
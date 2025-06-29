import { useConversation } from "@/hooks/useConversations"
import { Message, useMessages } from "@/hooks/useMessages"
import { useEffect, useRef, useState } from "react"
import { Input } from "../ui/input";
import { Loading } from "../ui/loading";
import { Error } from "../ui/error";

export interface MessageListProps {
    conversationId: number,
    selectedDocumentsId: number[]
}

const llmId = 2

const Messagelist = ({conversationId, selectedDocumentsId}:MessageListProps) =>{
    const {conversation, isError: conversationError, isLoading: conversationLoading} = useConversation(conversationId)
    const [messages, setMessages] = useState<Message[] | undefined>(conversation?.pgmessages)
    const [text, setText] = useState<string>('')
    const {createMessage, isUploading, uploadError, retryUpload} = useMessages(conversationId)

    useEffect(()=>{
        setMessages(conversation?.pgmessages)
    },[conversation])

    useEffect(()=>{
        bottomRef?.current?.scrollIntoView({ behavior: "smooth"})
    },[messages])
    
    const bottomRef = useRef<HTMLDivElement>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim() === "") return ;

        try {
          setMessages(prev => [
            ...(prev ?? []),
            {
              id: -1,
              text: text,
              role: 'user'
            }
          ]);
            await createMessage(text, llmId, selectedDocumentsId, conversationId);
            
            setText(""); // Clear input after submit
        } catch (error) {
            // Error is already handled in the hook, just log for debugging
            console.error('Failed to send message:', error);
        }
    };

    // Show loading state while conversation is loading
    if (conversationLoading) {
        return (
            <div className="flex flex-col h-full w-full bg-white rounded-2xl shadow-lg relative">
                <div className="flex-1 flex items-center justify-center">
                    <Loading text="Loading conversation..." size="lg" />
                </div>
            </div>
        );
    }

    // Show error state if conversation failed to load
    if (conversationError) {
        return (
            <div className="flex flex-col h-full w-full bg-white rounded-2xl shadow-lg relative">
                <div className="flex-1 flex items-center justify-center p-8">
                  Fail
                    <div/>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full w-full bg-white rounded-2xl shadow-lg relative">
          {/* Title (fixed) */}
          <div className="text-3xl font-bold border-b px-8 py-6 text-gray-800 sticky top-0 z-10 bg-white">
            {conversation?.title}
          </div>
    
          {/* Scrollable Messages */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
            { messages && messages.map((message) => (
              <div
                key={message.id}
                className={`flex w-full ${
                  message.role === "assistant" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[70%] p-4 rounded-2xl text-lg shadow-md break-words ${
                    message.role === "assistant" ? "bg-gray-200 text-gray-900" : "bg-blue-600 text-white"
                  }`}
                >
                  {message.text}
                </div>
                <div ref={bottomRef} />
              </div>
            ))}
          </div>
          
          {/* Upload Error */}
          {uploadError && (
            <div className="px-8 py-4">
              <Error 
                message={uploadError} 
                onRetry={retryUpload}
              />
            </div>
          )}
          
          {/* Loading State */}
          {isUploading && (
            <div className="px-8 py-4 bg-gray-50 border-t">
              <Loading text="Waiting for response..." size="sm" />
            </div>
          )}
          
          {/* Input fixed at bottom */}
          <form onSubmit={handleSubmit} className="w-full px-8 py-6 bg-white sticky bottom-0 z-20 flex items-center border-t">
            <Input 
              className="flex-1 h-14 text-xl px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all mr-4" 
              value={text} 
              onChange={(e)=>setText(e.currentTarget.value)}
              placeholder="Type your message..."
              disabled={isUploading}
            />
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl text-lg transition-all"
              disabled={isUploading || !text.trim()}
            >
              Send
            </button>
          </form>
        </div>
      );
    };

export default Messagelist
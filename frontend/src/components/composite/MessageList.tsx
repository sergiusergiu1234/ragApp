import { useConversation } from "@/hooks/useConversations"
import { Message, useMessages } from "@/hooks/useMessages"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { Input } from "../ui/input";
import { Loading } from "../ui/loading";
import { Error } from "../ui/error";
import { text } from "node:stream/consumers";
import MessageInput from "./MessageInput";

export interface MessageListProps {
    messages: Message[] | undefined
    isUploading: boolean
}

const llmId = 2

const Messagelist = ({messages, isUploading}: MessageListProps) =>{
  // to show loading state if message is currently uploading

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      }
    }, [messages]);

 

    return (
        <div className="flex flex-col h-full w-full bg-white rounded-2xl shadow-lg relative ">
          {/* Title (fixed) */}
          <div className=" text-3xl font-bold border-b px-8 py-6 text-gray-800 sticky top-0 z-10 bg-white">
            {/* {conversation?.title} */}
          </div>
    
          {/* Scrollable Messages */}
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-8 py-6 space-y-4 relative">
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
              </div>
            ))}
            {/* Loader overlay at the bottom */}
            {isUploading && (
              <div className=" left-0 right-0 bottom-0 flex justify-center pb-4 pointer-events-none">
                <Loading text="Waiting for response..." size="sm" />
              </div>
            )}
          </div>
          
        </div>
      );
    };

export default Messagelist
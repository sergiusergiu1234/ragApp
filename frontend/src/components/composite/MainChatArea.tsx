import { User } from "@auth0/nextjs-auth0/types"
import { Button } from "../ui/button"
import MessageList from "./MessageList"
import { FcGoogle } from "react-icons/fc"
import { Message } from "@/hooks/useMessages"

export interface MainChatAreaProps {
    user: User | null |undefined,
    selectedConversationId: number | null | undefined,
    isUploading: boolean,
    mergedMessages: Message[],
    
    selectedConversationTitle: string
}

const MainChatArea = ({user, selectedConversationId, isUploading, mergedMessages,selectedConversationTitle}:MainChatAreaProps ) => {
  return (
    <div className="h-full w-full overflow-hidden flex flex-col">
      {selectedConversationId ? (
        <MessageList selectedConversationTitle={selectedConversationTitle} isUploading={isUploading} messages={mergedMessages} />
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center">
          <label className="text-4xl font-semibold text-gray-700 mb-8">
            Welcome {user ? (user.given_name || user.email) : "friend"}. Try the chat.
          </label>
        </div>
      )}
    </div>
  );
};

export default MainChatArea
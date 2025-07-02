'use client'
import { FcGoogle } from "react-icons/fc";
import ConversationList from "@/components/composite/ConversationList";
import DocumentsList from "@/components/composite/DocumentsList";
import MessageInput from "@/components/composite/MessageInput";
import MessageList from "@/components/composite/MessageList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TermsRequired } from "@/components/ui/terms-required";
import { useConversation, useConversations } from "@/hooks/useConversations";
import { useInternalUser } from "@/hooks/useInternalUser";
import { Message, useMessages } from "@/hooks/useMessages";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null)
  const [selectedDocumentsId, setSelectedDocumentsId] = useState<number[]>([])
  const { user } = useUser();
  const { acceptTerms, hasAcceptedTerms } = useInternalUser(user?.sub)
  const { createConversation } = useConversations();
  const { createMessage, isUploading } = useMessages(selectedConversationId);
  const handleSelectConversation = (conversationId: number)=>{
    setSelectedConversationId(conversationId)
  }
  const {conversation, isError: conversationError, isLoading: conversationLoading} = useConversation(selectedConversationId)
  const [messages, setMessages] = useState<Message[] | undefined>(conversation?.pgmessages)
  const [pendingMessage, setPendingMessage] = useState<Map<number,Message> | null>(null);
  
  useEffect(()=>{
      setMessages(conversation?.pgmessages)
  },[conversation])

  const mergedMessages = [
    ...(messages ?? []),
    ...(selectedConversationId !== null && pendingMessage?.get(selectedConversationId) ? [pendingMessage.get(selectedConversationId)!] : [])
  ];

  const handleSendMessage = async (message: string) => {
    let conversationId = selectedConversationId;
    if (!conversationId) {
      const newConversation = await createConversation("New Conversation");
      conversationId = newConversation.id;
      const newPending = new Map(pendingMessage);
      conversationId && newPending.set(conversationId, { id: -1, text: message, role: 'user' });
      setPendingMessage(newPending);
      setSelectedConversationId(conversationId);
      conversationId && await createMessage(message, 2, selectedDocumentsId, conversationId);
      setPendingMessage(null);
    } else {
      const newPending = new Map(pendingMessage);
      conversationId && newPending.set(conversationId, { id: -1, text: message, role: 'user' });
      setPendingMessage(newPending);
      await createMessage(message, 2, selectedDocumentsId, conversationId);
      setPendingMessage(null);
    }
  };
  return (<>
 {hasAcceptedTerms() ? <div className="flex flex-col bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen relative">
     
     <div className="absolute top-4 right-8 z-50 flex items-center gap-4">
       {user ? (
         <>
           <span className="text-gray-700 font-medium">{user.name || user.email}</span>
           <Button asChild variant="outline">
             <a href="/auth/logout">Log out</a>
           </Button>
         </>
       ) : (
         <Button asChild variant="outline">
           <a href="/auth/login"><FcGoogle />Log in</a>
         </Button>
       )}
     </div>
     <div className="flex items-center justify-center min-h-screen ">
       
       <div className="flex flex-row bg-white rounded-2xl shadow-2xl overflow-hidden w-[95vw] max-w-7xl h-[80vh]">
         {/* Sidebar */}
       
         <div className="flex flex-col justify-center items-center bg-gray-50 border-r w-fit max-w-[35%] p-6 h-full ">
           <div className="w-full flex-1 flex flex-col overflow-scroll">
             <ConversationList
               selectedConversationId={selectedConversationId || null}
               handleSelectConversation={handleSelectConversation}
             />
             <DocumentsList setSelectedDocuments={setSelectedDocumentsId} selectedDocuments={selectedDocumentsId}/>
           </div>
         </div>
         {/* Main Chat Area */}
         <div className="flex-1 flex flex-col items-center justify-center h-full">
           <div className="flex-1 w-full flex flex-col items-center justify-center h-full">
             {selectedConversationId ? (
               <div className="w-full h-[80%] flex flex-col items-center justify-center">
                 {/* Make MessageList scrollable and fill available space */}
                 <div className="flex-1 w-full overflow-y-auto px-8 py-6">
                   <MessageList isUploading={isUploading } messages={mergedMessages} />
                 </div>
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center h-full w-full">
                 <label className="text-4xl font-semibold text-gray-700 mb-8">
                   Welcome {user ? (user.given_name || user.email) : "friend"}. Try the chat.
                 </label>
                 {!user && <label className="text-2xl font-semibold text-gray-700 mb-8">
                  <Button asChild variant="outline">
                    <a href="/auth/login"><FcGoogle />Login</a>
                  </Button> to use the chat 
                 </label>}
                 
               </div>
             )}
              <MessageInput notLoggedIn={ user == null} onSend={handleSendMessage} isUploading={isUploading} />
           </div>
           
         </div>
       </div>
     </div>
   </div>: <TermsRequired onAccept={()=>acceptTerms()}/>}

    </>
    
    
  );
}
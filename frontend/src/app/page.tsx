'use client'

import ConversationList from "@/components/composite/ConversationList";
import DocumentsList from "@/components/composite/DocumentsList";
import MessageList from "@/components/composite/MessageList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TermsRequired } from "@/components/ui/terms-required";
import { useInternalUser } from "@/hooks/useInternalUser";
import { useUser } from "@auth0/nextjs-auth0";
import { useState } from "react";

export default function Home() {
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null)
  const [selectedDocumentsId, setSelectedDocumentsId] = useState<number[]>([])
  const { user } = useUser();
  const { internalUser, removeInternalUser, acceptTerms, hasAcceptedTerms } = useInternalUser(user?.sub)

  const handleSelectConversation = (conversationId: number)=>{
    setSelectedConversationId(conversationId)
  }



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
           <a href="/auth/login">Log in</a>
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
               <div className="w-full h-full flex flex-col items-center justify-center">
                 {/* Make MessageList scrollable and fill available space */}
                 <div className="flex-1 w-full overflow-y-auto px-8 py-6">
                   <MessageList selectedDocumentsId={selectedDocumentsId} conversationId={selectedConversationId} />
                 </div>
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center h-full w-full">
                 <label className="text-4xl font-semibold text-gray-700 mb-8">
                   Welcome {user ? (user.given_name || user.email) : "friend"}. Try the chat.
                 </label>
               </div>
             )}
           </div>
         </div>
       </div>
     </div>
   </div>: <TermsRequired onAccept={()=>acceptTerms()}/>}

    </>
    
    
  );
}
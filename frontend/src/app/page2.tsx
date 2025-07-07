"use client";
import { FcGoogle } from "react-icons/fc";
import ConversationList from "@/components/composite/ConversationList";
import DocumentsList from "@/components/composite/DocumentsList";
import MessageInput from "@/components/composite/MessageInput";
import MessageList from "@/components/composite/MessageList";
import { Button } from "@/components/ui/button";
import { TermsRequired } from "@/components/ui/terms-required";
import { useConversation, useConversations } from "@/hooks/useConversations";
import { useInternalUser } from "@/hooks/useInternalUser";
import { Message, useMessages } from "@/hooks/useMessages";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useRef, useState } from "react";
import App from "next/app";
import AppSidebar from "@/components/composite/AppSiderbar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import MainChatArea from "@/components/composite/MainChatArea";

export default function Home() {
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [selectedDocumentsId, setSelectedDocumentsId] = useState<number[]>([]);
  const { user } = useUser();
  const { acceptTerms, hasAcceptedTerms } = useInternalUser(user?.sub);
  const { createConversation } = useConversations();
  const { createMessage, isUploading } = useMessages(selectedConversationId);
  const handleSelectConversation = (conversationId: number) => {
    setSelectedConversationId(conversationId);
  };
  const {
    conversation,
    isError: conversationError,
    isLoading: conversationLoading,
  } = useConversation(selectedConversationId);
  const [messages, setMessages] = useState<Message[] | undefined>(
    conversation?.pgmessages
  );
  const [pendingMessage, setPendingMessage] = useState<Map<
    number,
    Message
  > | null>(null);

  useEffect(() => {
    setMessages(conversation?.pgmessages);
  }, [conversation]);

  const mergedMessages = [
    ...(messages ?? []),
    ...(selectedConversationId !== null &&
    pendingMessage?.get(selectedConversationId)
      ? [pendingMessage.get(selectedConversationId)!]
      : []),
  ];

  const handleSendMessage = async (message: string) => {
    let conversationId = selectedConversationId;
    if (!conversationId) {
      const newConversation = await createConversation("New Conversation");
      conversationId = newConversation.id;
      const newPending = new Map(pendingMessage);
      conversationId &&
        newPending.set(conversationId, { id: -1, text: message, role: "user" });
      setPendingMessage(newPending);
      setSelectedConversationId(conversationId);
      conversationId &&
        (await createMessage(message, 2, selectedDocumentsId, conversationId));
      setPendingMessage(null);
    } else {
      const newPending = new Map(pendingMessage);
      conversationId &&
        newPending.set(conversationId, { id: -1, text: message, role: "user" });
      setPendingMessage(newPending);
      await createMessage(message, 2, selectedDocumentsId, conversationId);
      setPendingMessage(null);
    }
  };
  return (
    <>
      {hasAcceptedTerms() ? (
        <div className="bg-red-600 h-full">
          <div className="flex flex-row">
          <AppSidebar
                handleSelectConversation={handleSelectConversation}
                selectedConversationId={selectedConversationId}
                setSelectedDocumentsId={setSelectedDocumentsId}
                selectedDocumentsId={selectedDocumentsId}
              />
            <div className="">
      
              <div className="">
                {user ? (
                  <>
                    <span className="text-gray-700 font-medium">
                      {user.name || user.email}
                    </span>
                    <Button asChild variant="outline">
                      <a href="/auth/logout">Log out</a>
                    </Button>
                  </>
                ) : (
                  <Button asChild variant="outline">
                    <a href="/auth/login">
                      <FcGoogle />
                      Log in
                    </a>
                  </Button>
                )}
              </div>
              <MainChatArea
                handleSendMessage={handleSendMessage}
                mergedMessages={mergedMessages}
                selectedConversationId={selectedConversationId}
                user={user}
                isUploading={isUploading}
              />
              <MessageInput
                        onSend={handleSendMessage}
                        isUploading={isUploading}
                        notLoggedIn={!user}
                      />
            </div>
          </div>
        </div>
      ) : (
        <TermsRequired onAccept={() => acceptTerms()} />
      )}
    </>
  );
}

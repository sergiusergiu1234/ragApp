import { useUser } from "@auth0/nextjs-auth0";
import { Sidebar, SidebarContent, SidebarGroup, SidebarTrigger } from "../ui/sidebar"
import ConversationList from "./ConversationList"
import DocumentsList from "./DocumentsList"
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

export interface AppSIdebarProps {
    selectedConversationId: number | null;
    setSelectedDocumentsId: React.Dispatch<React.SetStateAction<number[]>>
    selectedDocumentsId: number[];
    handleSelectConversation: (conversationId: number) => void;
}

const AppSidebar = ({selectedConversationId, setSelectedDocumentsId, selectedDocumentsId, handleSelectConversation}: AppSIdebarProps) =>{
    const {user} = useUser()
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarTrigger />
            <SidebarContent>
                <div className="w-full overflow-y-auto">
               
                    <SidebarGroup className="w-full group-data-[collapsible=icon]:hidden">
                        <ConversationList
                            selectedConversationId={selectedConversationId || null}
                            handleSelectConversation={handleSelectConversation}
                        />
                        
                            <DocumentsList
                                setSelectedDocuments={setSelectedDocumentsId}
                                selectedDocuments={selectedDocumentsId}
                            />
                       
                        
                    </SidebarGroup>
                </div>
            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar
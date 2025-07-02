import { Message } from "@/hooks/useMessages"
import { Button } from "../ui/button"
import { HiOutlineDotsVertical } from "react-icons/hi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import { useState } from "react";
import RenameConversationComponent from "./RenameConversationComponent";
import { useConversations } from "@/hooks/useConversations";

export interface ConversationCardProps {
    id: number
    title: String
    isSelected: boolean
    onRename: () => void
}

const ConversationCard = ({id, title, isSelected, onRename}: ConversationCardProps) =>{

    const {deleteConversation} = useConversations()

    return (
        <div 
            className={`
                group w-full max-w-xs mx-auto p-2 rounded-3xl duration-200 cursor-pointer flex items-center
                ${isSelected ? "bg-blue-100 shadow-md" : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"}
            `}
        >
            <div className="flex-1 min-w-0">
                <h3 className={`font-medium text-base truncate ${isSelected ? "text-blue-800" : "text-gray-700"}`}>
                    {title}
                </h3>
            </div>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    className={`${isSelected ? '': 'hover:bg-gray-300'} ml-2 rounded-3xl  p-2 h-8 w-8 flex items-center justify-center`}
                    variant={'ghost'}
                    tabIndex={-1}>
                        <HiOutlineDotsVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onRename}>
                    Rename
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>deleteConversation(id)} className="text-red-600">
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default ConversationCard
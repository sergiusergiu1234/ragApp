import { Message } from "@/hooks/useMessages"


export interface ConversationCardProps {
    id: number
    title: String
    pgmessages: Message[],
    isSelected: boolean
}

const ConversationCard = ({id, title, pgmessages, isSelected}: ConversationCardProps) =>{
    
    return (
        <div 
            className={`
                w-full p-2 rounded-xl transition-all duration-200 cursor-pointer
                ${isSelected 
                    ? "bg-blue-100 border-2 border-blue-300 shadow-md" 
                    : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                }
            `}
        >
            <div className="flex flex-col space-y-2">
                <h3 className={`font-semibold text-sm truncate ${isSelected ? "text-blue-800" : "text-gray-800"}`}>
                    {title}
                </h3>
               
            </div>
        </div>
    )
}

export default ConversationCard
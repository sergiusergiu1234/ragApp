import { Document, useDocuments } from "@/hooks/useDocuments"
import { Button } from "../ui/button"
import { FaRegTrashAlt } from "react-icons/fa";

export interface DocumentCardProps extends Document{
}

const DocumentCard = ({id,name,dateCreated,userId}:DocumentCardProps) =>{
    const { removeDocument} = useDocuments()


    return <div>
        
        {name}
        <button onClick={()=>removeDocument(id)}><FaRegTrashAlt/></button>
    </div>
}
export default DocumentCard
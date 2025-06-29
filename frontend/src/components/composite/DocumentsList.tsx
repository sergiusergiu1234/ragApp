import { useEffect, useState } from "react"
import { Document, useDocuments } from "@/hooks/useDocuments"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import DocumentCard from "./DocumentCard"
import { Select } from "../ui/select"
import { Checkbox } from "../ui/checkbox"
import { useUser } from "@auth0/nextjs-auth0"
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip"
import { Loader } from "lucide-react"

export interface DocumentsListProps {
    setSelectedDocuments: React.Dispatch<React.SetStateAction<number[]>>;
    selectedDocuments: number[]
}


const DocumentsList = ({setSelectedDocuments,selectedDocuments}:DocumentsListProps) =>{
    const { user } = useUser();
    const {documents, createDocuments, isLoading} = useDocuments()
    const [documentState, setDocumentState] = useState<File[] | []>([])
    const [isUploading, setIsUploading] = useState<boolean>(false)

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        setIsUploading(true)
        const newDocuments =  createDocuments(documentState) 
        
    }
    useEffect(()=>{
        setIsUploading(false)
    },[documents])
    
    return (
        <div className="flex flex-col h-full bg-white rounded-2xl shadow-lg p-6 space-y-6">
            {/* Header */}
        
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Documents</h2>
                <p className="text-gray-600">Check documents to use in responses</p>
            </div>
            
            {/* Documents List */}
            <div className="flex-1 overflow-y-auto space-y-3">
                {isLoading ? <>Loading documents <Loader/></>: <> {documents ? documents.map((d) => (
                    <div key={d.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <input 
                            type="checkbox"
                            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            checked={selectedDocuments.includes(d.id)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedDocuments(prev => [...prev, d.id]);                        
                                } else {
                                    setSelectedDocuments(prev => prev.filter(docId => docId !== d.id));
                                }
                            }}
                        />
                        <div className="flex-1">
                            <DocumentCard 
                                key={d.id} 
                                id={d.id} 
                                name={d.name} 
                                dateCreated={d.dateCreated} 
                                userId={d.userId}
                            />
                        </div>
                    </div>
                )) : (
                    <div className="text-center text-gray-500 py-8">
                        No documents available
                    </div>
                )}</>}
               
            </div>

            {/* Upload Section */}
            {isUploading ? <label>Uploading</label> :  <div className="border-t pt-6 space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Upload New Documents</label>
                    <Tooltip>
                        {user ? (
                            
                                <Input
                                    type="file"
                                    multiple
                                    disabled={false}
                                    className={`border-2 border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all`}
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setDocumentState(Array.from(e.target.files));
                                        }
                                    }}
                                />
                         
                        ) : (
                            <TooltipTrigger asChild>
                                <span className="block w-full hover:cursor-not-allowed">
                                    <Input
                                        type="file"
                                        multiple
                                        disabled
                                        tabIndex={-1}
                                        aria-disabled="true"
                                        className="border-2 border-gray-300 transition-all opacity-60 cursor-not-allowed w-full"
                                        onChange={() => {}}
                                    />
                                </span>
                            </TooltipTrigger>
                        )}
                        <TooltipContent>
                            <p>you must log in to upload documents</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <Tooltip>
                    {user ? (
                       
                            <Button 
                                disabled={false}
                                onClick={handleSubmit}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all"
                            >
                                Upload Files
                            </Button>
                       
                    ) : (
                        <TooltipTrigger asChild>
                            <span className="w-full block hover:cursor-not-allowed">
                                <Button
                                    disabled
                                    tabIndex={-1}
                                    aria-disabled="true"
                                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl transition-all opacity-60 cursor-not-allowed"
                                >
                                    Upload Files
                                </Button>
                            </span>
                        </TooltipTrigger>
                    )}
                    <TooltipContent>
                        <p>you must log in to upload documents</p>
                    </TooltipContent>
                </Tooltip>
            </div>}
           
        </div>
    )
}

export default DocumentsList
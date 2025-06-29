import { fetcher } from "@/lib/fetcher"
import useSWR from "swr"

export type Document ={
    id: number,
    name : String
    dateCreated: Date
    userId: number
}

export const useDocuments = ()=>{
    const {
        data: documents,
        error,
        isLoading,
        mutate
    } = useSWR<Document[]>(
        `/api/material`,
        fetcher
    )

    const createDocuments = async(files: File[])=>{
        const formData = new FormData()
        files.forEach(f =>{
            formData.append('indexedFiles',f)
        })
        const newDocuments = await fetcher(
            `/api/material`,'POST',formData
        )
        await mutate()
        return newDocuments
    }

    const removeDocument = async (documentId: number)=>{
        const deletedDocument = await fetcher(
            `/api/material/${documentId}`,'DELETE'
        )
        await mutate()
        return deletedDocument
    }

    return {
        documents,
        isLoading,
        isError: error,
        createDocuments,
        removeDocument
    }
}
from haystack import Document, component
from typing import List

@component
class MetadataNormalizer:
    def __init__(self):
        pass

    @component.output_types(documents=List[Document])
    def run(self, documents: List[Document], 
            sourceId: str) -> List[Document]:
            
        normalized_documents = []
        for doc in documents:
            # Preserve original metadata
            normalized_meta = doc.meta.copy() if doc.meta else {}
            # Add normalized fields
            normalized_meta.update({
                "sourceId": sourceId 
            })
            normalized_documents.append(Document(content=doc.content, meta=normalized_meta))
        return {"documents": normalized_documents}
import { useConversations } from "@/hooks/useConversations";
import { useState } from "react";

export interface RenameConversationComponentProps {
  conversationId: number;
  onDone: () => void;
}

const RenameConversationComponent = ({ conversationId, onDone }: RenameConversationComponentProps) => {
  const [newTitle, setNewTitle] = useState("");
  const {updateConversationName} = useConversations()
  const handleRename = async () => {
    const newName = await updateConversationName(newTitle,conversationId)
    onDone();
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="text-lg font-semibold">Rename Conversation</h2>
      <input
        className="border rounded px-2 py-1 w-48"
        value={newTitle}
        onChange={e => setNewTitle(e.target.value)}
        placeholder="New conversation name"
      />
      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded"
          onClick={handleRename}
        >
          Save
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-1 rounded"
          onClick={onDone}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RenameConversationComponent;
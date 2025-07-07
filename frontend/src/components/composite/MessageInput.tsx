import { useState } from "react";
import { Input } from "../ui/input";

export interface MesssageInputProps {
    onSend: (message: string) => void
    isUploading?: boolean
    notLoggedIn: boolean
}

const MessageInput = ({ onSend, isUploading, notLoggedIn }: MesssageInputProps) => {

    const [text, setText] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim() === "") return;

        try {
            await onSend(text.trim());

            setText(""); // Clear input after submit
        } catch (error) {
            // Error is already handled in the hook, just log for debugging
            console.error('Failed to send message:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className=" px-8 py-6 bg-white  flex items-center ">
            <Input
                className=""
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
                placeholder="Type your message..."
                disabled={isUploading || notLoggedIn}
            />
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl text-lg transition-all"
                disabled={isUploading || !text.trim()}
            >
                Send
            </button>
        </form>
    )
}

export default MessageInput;
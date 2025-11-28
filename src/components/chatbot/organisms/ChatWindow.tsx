/**
 * ChatWindow Organism - Main chat interface
 */

'use client';

import React from 'react';
import { useChatbot } from '@/hooks/useChatbot';
import { MessageList } from '@/components/chatbot/molecules/MessageList';
import { ChatInput } from '@/components/chatbot/atoms/ChatInput';
import { ChatHeader } from '@/components/chatbot/molecules/ChatHeader';

interface ChatWindowProps {
    onClose: () => void;
}

export function ChatWindow({ onClose }: ChatWindowProps) {
    const { messages, isLoading, sendMessage, clearHistory } = useChatbot();

    const handleNewChat = () => {
        if (messages.length > 0) {
            const confirmed = window.confirm('Bạn có chắc muốn bắt đầu cuộc trò chuyện mới? Lịch sử chat hiện tại sẽ bị xóa.');
            if (confirmed) {
                clearHistory();
            }
        }
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-900">
            <ChatHeader
                onClose={onClose}
                onNewChat={handleNewChat}
                messageCount={messages.length}
            />
            <MessageList messages={messages} isLoading={isLoading} />
            <ChatInput onSend={sendMessage} disabled={isLoading} />
        </div>
    );
}

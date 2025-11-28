/**
 * MessageList Molecule - Scrollable message container
 */

'use client';

import React, { useEffect, useRef } from 'react';
import { ChatMessage as ChatMessageType } from '@/components/chatbot/types';
import { ChatMessage } from '@/components/chatbot/atoms/ChatMessage';
import { LoadingIndicator } from '@/components/chatbot/atoms/LoadingIndicator';
import { ProductSuggestionList } from '@/components/chatbot/molecules/ProductSuggestionList';

interface MessageListProps {
    messages: ChatMessageType[];
    isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom on new messages with smooth behavior
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    if (messages.length === 0 && !isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="text-4xl mb-4">💬</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Chào mừng đến với TechBox AI
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Hỏi tôi về sản phẩm, chính sách, hoặc bất cứ điều gì bạn cần!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto px-4 py-4 scroll-smooth chatbot-scrollbar"
        >
            <div className="space-y-2">
                {messages.map((message, index) => {
                    // Extract products array from paginated response: {content: [...], page: {...}}
                    const productsToDisplay = (message.products as any)?.content || [];

                    return (
                        <div key={index}>
                            <ChatMessage message={message} />
                            {/* Show product suggestions if available */}
                            {productsToDisplay.length > 0 && (
                                <ProductSuggestionList products={productsToDisplay} />
                            )}
                        </div>
                    );
                })}
                {isLoading && <LoadingIndicator />}
                {/* Invisible element for scroll anchor */}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}

/**
 * ChatMessage Atom - Individual chat message display
 */

'use client';

import React from 'react';
import { ChatMessage as ChatMessageType } from '@/components/chatbot/types';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../chatbot.css';

interface ChatMessageProps {
    message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === 'user';
    const isSystem = message.role === 'system';

    if (isSystem) {
        return (
            <div className="flex justify-center my-2">
                <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                    {message.content}
                </span>
            </div>
        );
    }

    return (
        <div className={cn('flex mb-4', isUser ? 'justify-end' : 'justify-start')}>
            <div
                className={cn(
                    'max-w-[80%] rounded-lg px-4 py-2',
                    isUser
                        ? 'bg-[#E61E4D] text-white rounded-br-none'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none'
                )}
            >
                {isUser ? (
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                ) : (
                    <div className="prose-chatbot">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                p: ({ children }) => <p className="my-1">{children}</p>,
                                ul: ({ children }) => <ul className="list-disc pl-4 my-1">{children}</ul>,
                                ol: ({ children }) => <ol className="list-decimal pl-4 my-1">{children}</ol>,
                                li: ({ children }) => <li className="my-0.5">{children}</li>,
                            }}
                        >
                            {message.content}
                        </ReactMarkdown>
                    </div>
                )}
                {message.timestamp && (
                    <span className={cn('text-xs mt-1 block', isUser ? 'text-white/70' : 'text-gray-500')}>
                        {new Date(message.timestamp).toLocaleTimeString('vi-VN', {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </span>
                )}
            </div>
        </div>
    );
}

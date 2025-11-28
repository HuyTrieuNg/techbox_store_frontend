/**
 * ChatHeader Molecule - Chat title, status, and controls
 */

'use client';

import React from 'react';
import { Button } from '@/components/UI/button';
import { X, RotateCcw } from 'lucide-react';
import Image from 'next/image';

interface ChatHeaderProps {
    onClose: () => void;
    onNewChat: () => void;
    messageCount: number;
}

export function ChatHeader({ onClose, onNewChat, messageCount }: ChatHeaderProps) {
    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#E61E4D] to-[#c71a3f] rounded-full flex items-center justify-center overflow-hidden">
                    <img src="/chatbot.png" alt="TechBox AI" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">TechBox AI</h3>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">Trực tuyến</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {messageCount > 0 && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onNewChat}
                        title="Cuộc trò chuyện mới"
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <X className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}

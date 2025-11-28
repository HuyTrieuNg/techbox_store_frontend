/**
 * ChatPopup Organism - Floating chat button and popup window
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/UI/button';
import { ChatWindow } from './ChatWindow';
import { cn } from '@/lib/utils';

export function ChatPopup() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Chat Button */}
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#E61E4D] hover:bg-[#c71a3f] shadow-lg hover:shadow-xl transition-all z-50 p-0 overflow-hidden"
                    size="icon"
                >
                    <img src="/chatbot.png" alt="Chat" className="w-full h-full object-cover" />
                </Button>
            )}

            {/* Chat Popup Window - Responsive */}
            <div
                className={cn(
                    // Mobile: full screen
                    'fixed inset-0 bg-white dark:bg-gray-900 z-50 transition-all duration-300',
                    // Desktop: fixed size at bottom-right
                    'md:bottom-6 md:right-6 md:top-auto md:left-auto md:w-[500px] md:h-[700px] md:rounded-lg md:shadow-2xl md:border md:border-gray-200 md:dark:border-gray-700',
                    isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                )}
            >
                {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
            </div>
        </>
    );
}

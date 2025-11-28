/**
 * useChatbot Hook - Chat state management and API integration
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChatMessage, ChatbotState } from '@/components/chatbot/types';
import { sendChatMessage } from '@/services/chatbotService';
import { ProductService } from '@/services/productService';

const STORAGE_KEY = 'techbox_chat_history';
const MAX_HISTORY_FOR_API = 10;

export function useChatbot() {
    const [state, setState] = useState<ChatbotState>({
        messages: [],
        isLoading: false,
        error: null,
    });

    // Load chat history from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const messages = JSON.parse(stored) as ChatMessage[];
                setState((prev) => ({ ...prev, messages }));
            }
        } catch (error) {
            console.error('[useChatbot] Error loading chat history:', error);
        }
    }, []);

    // Save chat history to localStorage whenever messages change
    useEffect(() => {
        if (state.messages.length > 0) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state.messages));
            } catch (error) {
                console.error('[useChatbot] Error saving chat history:', error);
            }
        }
    }, [state.messages]);

    /**
     * Send a message to the chatbot
     */
    const sendMessage = useCallback(async (question: string) => {
        if (!question.trim()) return;

        // Add user message
        const userMessage: ChatMessage = {
            role: 'user',
            content: question,
            timestamp: Date.now(),
        };

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, userMessage],
            isLoading: true,
            error: null,
        }));

        try {
            // Prepare history (last 10 messages only, excluding the current question)
            const historyForAPI = state.messages
                .slice(-MAX_HISTORY_FOR_API)
                .map((msg) => ({
                    role: msg.role as 'user' | 'assistant',
                    content: msg.content,
                }));

            // Call API
            const response = await sendChatMessage(question, historyForAPI);

            console.log('[useChatbot] API Response:', response);

            // Fetch products if SPUs are returned
            let products = undefined;
            if (response.related_products && response.related_products.length > 0) {
                console.log('[useChatbot] Fetching products for SPUs:', response.related_products);
                const productResponse = await ProductService.fetchProductsBySpus(response.related_products);
                // fetchProductsBySpus already returns the products array
                products = Array.isArray(productResponse) ? productResponse : [];
                console.log('[useChatbot] Fetched products:', products);
            }

            // Add AI response
            const aiMessage: ChatMessage = {
                role: 'assistant',
                content: response.answer,
                timestamp: Date.now(),
                products,
            };

            console.log('[useChatbot] AI Message with products:', aiMessage);

            setState((prev) => ({
                ...prev,
                messages: [...prev.messages, aiMessage],
                isLoading: false,
            }));
        } catch (error: any) {
            console.error('[useChatbot] Error sending message:', error);

            // Add error message
            const errorMessage: ChatMessage = {
                role: 'assistant',
                content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
                timestamp: Date.now(),
            };

            setState((prev) => ({
                ...prev,
                messages: [...prev.messages, errorMessage],
                isLoading: false,
                error: error.message || 'Unknown error',
            }));
        }
    }, [state.messages]);

    /**
     * Clear chat history (New Chat button)
     */
    const clearHistory = useCallback(() => {
        setState({
            messages: [],
            isLoading: false,
            error: null,
        });
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    return {
        messages: state.messages,
        isLoading: state.isLoading,
        error: state.error,
        sendMessage,
        clearHistory,
    };
}

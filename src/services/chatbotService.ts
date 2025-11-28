/**
 * Chatbot Service - API integration for AI chat
 */

import axios from 'axios';
import { ChatRequest, ChatResponse } from '@/components/chatbot/types';

const CHAT_ENDPOINT = '/aiproxy/chat';

/**
 * Send a chat message to the AI chatbot
 * @param question - User's question
 * @param history - Last 10 messages (already sliced by hook)
 */
export async function sendChatMessage(
    question: string,
    history: ChatRequest['history']
): Promise<ChatResponse> {
    try {
        const response = await axios.post<ChatResponse>(CHAT_ENDPOINT, {
            question,
            history,
        });

        return response.data;
    } catch (error) {
        console.error('[ChatbotService] Error sending message:', error);
        throw error;
    }
}

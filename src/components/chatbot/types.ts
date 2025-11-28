/**
 * Type definitions for AI Chatbot Component
 */

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp?: number;
    products?: Product[]; // Products suggested by AI
}

export interface ChatRequest {
    question: string;
    history: Array<{
        role: 'user' | 'assistant';
        content: string;
    }>;
}

export interface ChatResponse {
    answer: string;
    intent: string;
    related_products?: string[]; // SPU IDs
    src?: string;
    debug_query?: string;
}

export interface Product {
    id: number;
    name: string;
    imageUrl: string;
    displaySalePrice?: number;
    displayOriginalPrice?: number;
    averageRating: number;
    totalRatings: number;
    inWishlist?: boolean;
}

export interface ChatbotState {
    messages: ChatMessage[];
    isLoading: boolean;
    error: string | null;
}

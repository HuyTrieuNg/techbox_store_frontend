/**
 * Search Service - API integration for AI search
 */

import axios from 'axios';

export interface SearchResult {
    spu: string;
    score: number;
}

export interface SearchResponse {
    status?: string;
    data: SearchResult[];
}

const TEXT_SEARCH_ENDPOINT = '/aiproxy/search/text';
const IMAGE_SEARCH_ENDPOINT = '/aiproxy/search/image';

const RECOMMEND_ENDPOINT = '/aiproxy/recommend';

export class SearchService {
    /**
     * Search products by text query (semantic search)
     * @param query - Search query text
     * @param topK - Number of results to return (default: 10)
     */
    static async searchByText(query: string, topK: number = 20): Promise<SearchResult[]> {
        try {
            const response = await axios.post<SearchResponse>(TEXT_SEARCH_ENDPOINT, {
                query,
                top_k: topK,
            });

            return response.data.data || [];
        } catch (error) {
            console.error('[SearchService] Error searching by text:', error);
            return [];
        }
    }

    /**
     * Search products by image (visual search)
     * @param file - Image file to search
     * @param topK - Number of results to return (default: 20)
     */
    static async searchByImage(file: File, topK: number = 20): Promise<SearchResult[]> {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('top_k', topK.toString());

            const response = await axios.post<SearchResponse>(IMAGE_SEARCH_ENDPOINT, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data.data || [];
        } catch (error) {
            console.error('[SearchService] Error searching by image:', error);
            return [];
        }
    }

    /**
     * Get personalized product recommendations
     * @param spus - List of SPUs from user history or current product
     * @param topK - Number of recommendations to return (default: 5)
     */
    static async getRecommendations(spus: string[], topK: number = 5): Promise<SearchResult[]> {
        try {
            const response = await axios.post<SearchResponse>(RECOMMEND_ENDPOINT, {
                spus,
                top_k: topK,
            });

            return response.data.data || [];
        } catch (error) {
            console.error('[SearchService] Error getting recommendations:', error);
            return [];
        }
    }
}

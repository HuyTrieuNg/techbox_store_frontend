import { api } from "@/lib/axios";

export interface Review {
    id: number;
    productId: number;
    userId: number;
    userFullName: string;
    rating: number;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface ReviewPage {
    content: Review[];
    page: {
        size: number;
        number: number;
        totalElements: number;
        totalPages: number;
    };
}

export interface ReviewSummary {
    productId: number;
    totalReviews: number;
    averageRating: number;
    rating1Count: number;
    rating2Count: number;
    rating3Count: number;
    rating4Count: number;
    rating5Count: number;
}

export class ReviewService {
    static async getProductReviews(
        productId: number,
        page: number = 0,
        size: number = 10
    ): Promise<ReviewPage> {
        return api.get<ReviewPage>(`/products/${productId}/reviews`, {
            params: { page, size },
        });
    }

    static async getReviewSummary(productId: number): Promise<ReviewSummary> {
        return api.get<ReviewSummary>(`/products/${productId}/reviews/summary`);
    }

    static async addReview(
        productId: number,
        data: { rating: number; content: string }
    ): Promise<Review> {
        return api.post<Review>(`/products/${productId}/reviews`, data);
    }

    static async getMyReview(productId: number): Promise<Review | null> {
        try {
            return await api.get<Review>(`/products/${productId}/reviews/me`);

        } catch (err: any) {
            if (err.response?.status === 403 || err.response?.status === 400) {
                return null;
            }
            throw err;
        }
    }

    static async updateReview(
        productId: number,
        reviewId: number,
        data: { rating: number; content: string }
    ): Promise<Review> {
        return api.put<Review>(`/products/${productId}/reviews/${reviewId}`, data);
    }

    static async deleteReview(productId: number, reviewId: number): Promise<void> {
        return api.delete(`/products/${productId}/reviews/${reviewId}`);
    }
}
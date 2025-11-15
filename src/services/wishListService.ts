// services/wishlistService.ts
import { Product } from "@/features/product";
import { api } from "@/lib/axios";

export interface WishlistResponse {
    content: Product[];
    page: {
        totalElements: number;
    };
}

export class WishlistService {
    static async getWishlist(): Promise<WishlistResponse> {
        return api.get("/wishlists");
    }

    static async addToWishlist(productId: number): Promise<any> {
        return api.post('/wishlists', { productId }); // Correct Gửi body
    }

    static async removeFromWishlist(productId: number): Promise<void> {
        return api.delete(`/wishlists/${productId}`);
    }
}
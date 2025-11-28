"use client";

import React, { useEffect, useState } from "react";
import { OrderService } from "@/services/orderService";
import { SearchService } from "@/services/searchService";
import { ProductService } from "@/services/productService";
import { useAuthContext } from "@/contexts/AuthContext";
import ProductCard from "@/components/ProductCard";
import { Loader2 } from "lucide-react";

interface PersonalizedRecommendationProps {
    currentSpu?: string; // Optional: SPU of the current product (for detail page)
}

export default function PersonalizedRecommendation({ currentSpu }: PersonalizedRecommendationProps) {
    const { user } = useAuthContext();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            setIsLoading(true);
            try {
                let spus: string[] = [];

                // 1. Get recent SPUs from order history if logged in
                if (user) {
                    try {
                        const recentSpus = await OrderService.getRecentProductSpus(10);
                        if (recentSpus && recentSpus.length > 0) {
                            spus = [...recentSpus];
                        }
                    } catch (error) {
                        console.error("Error fetching recent SPUs:", error);
                    }
                }

                // 2. Add current product SPU if available (Product Detail Page)
                if (currentSpu) {
                    // Add to the beginning of the list
                    spus = [currentSpu, ...spus];
                }

                // If no SPUs to base recommendations on, stop
                if (spus.length === 0) {
                    setIsLoading(false);
                    return;
                }

                // 3. Call AI Recommendation API
                // Limit input SPUs to avoid too long request
                const inputSpus = spus.slice(0, 10);
                const recommendations = await SearchService.getRecommendations(inputSpus, 10);

                if (recommendations.length > 0) {
                    // 4. Fetch full product details for recommended SPUs
                    const recommendedSpus = recommendations.map(r => r.spu);
                    const productDetails = await ProductService.fetchProductsBySpus(recommendedSpus);
                    setProducts(productDetails);
                }
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, [user, currentSpu]);

    if (isLoading) {
        return (
            <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-[#E61E4D]" />
            </div>
        );
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <div className="max-w-7xl mx-auto mt-12 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                Gợi ý cho bạn
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

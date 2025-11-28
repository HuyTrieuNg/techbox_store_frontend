/**
 * SearchTextModal - Modal for AI text search
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/UI/dialog';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { Search, Loader2 } from 'lucide-react';
import { SearchService } from '@/services/searchService';

interface SearchTextModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchTextModal({ isOpen, onClose }: SearchTextModalProps) {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (!query.trim()) return;

        setIsLoading(true);
        try {
            const results = await SearchService.searchByText(query, 20);

            if (results.length > 0) {
                // Extract SPUs and redirect to products page
                const spus = results.map(r => r.spu).join(',');
                router.push(`/products/all?search_type=text&query=${encodeURIComponent(query)}&spus=${spus}`);
                onClose();
            } else {
                alert('Không tìm thấy sản phẩm phù hợp');
            }
        } catch (error) {
            console.error('Search error:', error);
            alert('Có lỗi xảy ra khi tìm kiếm');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isLoading) {
            handleSearch();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Search className="h-5 w-5 text-[#E61E4D]" />
                        Tìm kiếm thông minh
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Mô tả sản phẩm bạn muốn tìm</label>
                        <Input
                            placeholder="VD: Laptop gaming dưới 20 triệu, màn hình 15 inch..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isLoading}
                            className="w-full"
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleSearch}
                            disabled={!query.trim() || isLoading}
                            className="bg-[#E61E4D] hover:bg-[#c71a3f]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Đang tìm...
                                </>
                            ) : (
                                <>
                                    <Search className="mr-2 h-4 w-4" />
                                    Tìm kiếm
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

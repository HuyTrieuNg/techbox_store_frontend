/**
 * SearchImageModal - Modal for AI image search
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/UI/dialog';
import { Button } from '@/components/UI/button';
import { Image as ImageIcon, Upload, Loader2, X } from 'lucide-react';
import { SearchService } from '@/services/searchService';

interface SearchImageModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchImageModal({ isOpen, onClose }: SearchImageModalProps) {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setSelectedFile(null);
            setPreviewUrl(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    }, [isOpen]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSearch = async () => {
        if (!selectedFile) return;

        setIsLoading(true);
        try {
            const results = await SearchService.searchByImage(selectedFile, 20);

            if (results.length > 0) {
                // Extract SPUs and redirect to products page
                const spus = results.map((r: any) => r.spu).join(',');
                router.push(`/products/all?search_type=image&spus=${spus}`);
                onClose();
                // Clean up preview URL
                if (previewUrl) URL.revokeObjectURL(previewUrl);
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

    const handleRemoveImage = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <ImageIcon className="h-5 w-5 text-[#E61E4D]" />
                        Tìm kiếm bằng hình ảnh
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Upload Area */}
                    {!previewUrl ? (
                        <div
                            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-[#E61E4D] transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                            <p className="text-sm font-medium mb-1">Nhấp để chọn hoặc kéo thả hình ảnh</p>
                            <p className="text-xs text-gray-500">PNG, JPG, JPEG (tối đa 10MB)</p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileSelect}
                            />
                        </div>
                    ) : (
                        /* Image Preview */
                        <div className="relative">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full h-64 object-contain rounded-lg border border-gray-200 dark:border-gray-700"
                            />
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2"
                                onClick={handleRemoveImage}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    )}

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
                            disabled={!selectedFile || isLoading}
                            className="bg-[#E61E4D] hover:bg-[#c71a3f]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Đang tìm...
                                </>
                            ) : (
                                <>
                                    <ImageIcon className="mr-2 h-4 w-4" />
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

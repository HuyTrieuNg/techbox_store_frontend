"use client";

import React from "react";
import { CartItem as CartItemType } from "@/features/cart";
import { useCart } from "@/hooks/useCart";
import { CartService } from "@/services/cartService";

interface Props {
  item: CartItemType;
}

const CartItem: React.FC<Props> = ({ item }) => {
  const { refreshCart } = useCart();

  const handleDecrease = async () => {
    if (item.quantity > 1) {
      await CartService.updateItem(item.productVariationId, item.quantity - 1);
      refreshCart();
    }
  };

  const handleIncrease = async () => {
    await CartService.updateItem(item.productVariationId, item.quantity + 1);
    refreshCart();
  };

  const handleRemove = async () => {
    await CartService.removeItem(item.productVariationId);
    refreshCart();
  };

  // Tính % giảm
  const hasDiscount = item.originalPrice > item.unitPrice;
  const discountPercent = hasDiscount
    ? Math.round(((item.originalPrice - item.unitPrice) / item.originalPrice) * 100)
    : 0;

  return (
    <div className="grid grid-cols-[2fr_2fr_1fr_2fr] items-center py-4 px-6 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
      {/* Cột sản phẩm */}
      <div className="flex items-center space-x-3">
        <button
          onClick={handleRemove}
          className="text-gray-500 dark:text-gray-400 hover:text-[#E61E4D] text-2xl cursor-pointer select-none"
          aria-label="Xóa sản phẩm"
        >
          ×
        </button>
        <div className="w-14 h-14 bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden rounded">
          <img
            src={item.productImage || "/no-image.png"}
            alt={item.productName}
            className="object-contain w-full h-full"
          />
        </div>
        <div>
          <p className="text-gray-800 dark:text-white font-medium text-sm line-clamp-2">
            {item.productName}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{item.variantName}</p>
        </div>
      </div>

      {/* Cột Giá - HIỂN THỊ GIÁ GỐC + GIÁ GIẢM */}
      <div className="text-center">
        {hasDiscount ? (
          <div className="space-y-1">
            <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
              {item.originalPrice.toLocaleString("vi-VN")} ₫
            </p>
            <p className="font-semibold text-[#E61E4D]">
              {item.unitPrice.toLocaleString("vi-VN")} ₫
            </p>
            {discountPercent > 0 && (
              <span className="inline-block text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-medium">
                -{discountPercent}%
              </span>
            )}
          </div>
        ) : (
          <p className="font-medium text-gray-700 dark:text-gray-300">
            {item.unitPrice.toLocaleString("vi-VN")} ₫
          </p>
        )}
      </div>

      {/* Cột Số lượng */}
      <div className="flex items-center justify-center space-x-2">
        <button
          onClick={handleDecrease}
          disabled={item.quantity <= 1}
          className={`
      w-7 h-7 rounded-full border flex items-center justify-center text-lg font-medium
      transition-all duration-200
      ${item.quantity <= 1
              ? "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed bg-gray-50 dark:bg-gray-800"
              : "border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95 cursor-pointer"
            }
    `}
          aria-label="Giảm số lượng"
        >
          −
        </button>
        <span className="w-8 text-center font-medium text-gray-900 dark:text-white">{item.quantity}</span>
        <button
          onClick={handleIncrease}
          disabled={!item.available || item.quantity >= item.stockQuantity}
          className={`
      w-7 h-7 rounded-full border flex items-center justify-center text-lg font-medium
      transition-all duration-200
      ${!item.available || item.quantity >= item.stockQuantity
              ? "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed bg-gray-50 dark:bg-gray-800"
              : "border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95 cursor-pointer"
            }
    `}
          aria-label="Tăng số lượng"
        >
          +
        </button>
      </div>

      {/* Cột Tổng */}
      <div className="text-right">
        <p className="font-semibold text-lg text-gray-800 dark:text-white">
          {(item.unitPrice * item.quantity).toLocaleString("vi-VN")} ₫
        </p>
      </div>
    </div>
  );
};

export default CartItem;
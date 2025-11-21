"use client";

export default function ProductImages({ product, selected, mainImage, setMainImage }: any) {
    const images = selected?.images?.length > 0
        ? selected.images
        : [{ imageUrl: product.imageUrl || "" }];

    return (
        <div className="space-y-6">
            {/* Ảnh lớn - HÌNH CHỮ NHẬT, HIỂN THỊ TOÀN BỘ ẢNH */}
            <div className="w-full max-w-2xl mx-auto">
                <div
                    className="relative w-full bg-gray-50 rounded-xl shadow-lg overflow-hidden flex items-center justify-center"
                    style={{ height: '400px' }} // Chiều cao cố định
                >
                    <img
                        src={mainImage || "/no-image.png"}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain rounded-lg"
                    />
                </div>
            </div>

            {/* Ảnh nhỏ - KHÔNG BỊ CẮT, KÍCH THƯỚC CỐ ĐỊNH, CUỘN NGANG */}
            <div className="overflow-x-auto pb-3">
                <div className="flex gap-3 min-w-max p-1">
                    {(selected?.images?.length ? selected.images : [{ imageUrl: product.imageUrl }])
                        .filter((i: any) => i?.imageUrl)
                        .map((img: any, idx: any) => (
                            <div
                                key={idx}
                                onClick={() => setMainImage(img.imageUrl || "/no-image.png")}
                                className={`
              w-20 h-20 rounded-lg border-2 cursor-pointer transition-all duration-200 flex-shrink-0
              flex items-center justify-center bg-white overflow-hidden
              ${mainImage === img.imageUrl
                                        ? "border-[#E61E4D] shadow-md scale-105"
                                        : "border-gray-300 hover:border-gray-400"
                                    }
            `}
                            >
                                <img
                                    src={img.imageUrl || "/no-image.png"}
                                    alt={`thumb-${idx}`}
                                    className="w-full h-full object-contain p-1"
                                />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
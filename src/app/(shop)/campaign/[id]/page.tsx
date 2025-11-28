import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { FaCalendarAlt, FaChevronRight, FaHome } from "react-icons/fa";
import Link from "next/link";

const baseUrl =  (process.env.SPRING_BACKEND_URL || 'http://localhost:8080') + '/api';

export default async function CampaignPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const [campaignRes, productsRes] = await Promise.all([
        fetch(`${baseUrl}/campaigns/${id}`, { cache: "no-store" }),
        fetch(`${baseUrl}/products?campaignId=${id}`, { cache: "no-store" })
    ]);

    if (!campaignRes.ok || !productsRes.ok) {
        notFound();
    }

    const campaign = await campaignRes.json();
    const productsData = await productsRes.json();

    const products = productsData.content || [];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <>
            <div className="flex items-center text-gray-600 text-base mb-6">
                <FaHome className="mr-2 text-gray-500" />
                <Link href="/" className="hover:text-[#E61E4D] transition">
                    Trang chủ
                </Link>
                <FaChevronRight className="mx-2 text-gray-400" />
                <span className="font-medium text-gray-800 capitalize">{campaign.name}</span>

            </div>

            <div className="bg-white rounded-md shadow-sm overflow-hidden mb-8">
                <div className="relative h-80 sm:h-80 lg:h-96 bg-gradient-to-br from-pink-50 to-red-50">
                    {campaign.image ? (
                        <img
                            src={campaign.image}
                            alt={campaign.name}
                            className="w-full h-full object-obtain"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-4" />
                                <p className="text-gray-500">Không có hình ảnh</p>
                            </div>
                        </div>
                    )}
                    
                </div>

                {/* Campaign Info*/}
                <div className="p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                        {campaign.name}
                    </h1>
                    {campaign.description && (
                        <p className="text-gray-600 text-base leading-relaxed mb-4">
                            {campaign.description}
                        </p>
                    )}

                    {/* Date Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-[#E61E4D]" />
                            <span>
                                <strong>Bắt đầu:</strong> {formatDate(campaign.startDate)}
                            </span>
                        </div>
                        <span className="hidden sm:inline">•</span>
                        <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-[#E61E4D]" />
                            <span>
                                <strong>Kết thúc:</strong> {formatDate(campaign.endDate)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                    {products.map((product: any) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 italic">Không có sản phẩm.</p>
            )}

        </>
    );
}
"use client";
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Link from 'next/link';

type Campaign = {
    id: number;
    name: string;
    description: string;
    image: string | null;
    imageID: string | null;
    startDate: string;
    endDate: string;
    promotionCount: number;
};

interface CampaignSliderProps {
    campaigns: Campaign[];
}

// const CampaignPlaceholder = ({ name, className = '' }: { name: string; className?: string }) => (
//     <div className={`bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-lg md:text-2xl font-bold h-full w-full ${className}`}>
//         {name}
//     </div>
// );
const CampaignPlaceholder = ({ name, className = '' }: { name: string; className?: string }) => (
    <div
        className={`relative rounded-lg flex items-center justify-center text-white font-bold h-full w-full bg-cover bg-center overflow-hidden ${className}`}
        style={{ backgroundImage: "url('/banner.jpg')" }}
    >
        {/* Làm mờ background nhẹ để chữ nổi */}
        <div className="absolute inset-0 bg-white/30 blur-sm"></div>
        {/* Overlay đen để tạo depth */}
        <div className="absolute inset-0 bg-black/55"></div>

        {/* Overlay gradient nhẹ giữ phong cách cũ */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20"></div>

        {/* Text với hiệu ứng nổi */}
        <div
            className="relative z-10 px-6 text-3xl md:text-5xl font-extrabold tracking-wide"
            style={{
                textShadow: `
                    0px 2px 2px rgba(0, 0, 0, 0.7),
                    0px 4px 4px rgba(0, 0, 0, 0.6),
                    0px 6px 6px rgba(0, 0, 0, 0.5),
                    0px 8px 12px rgba(0, 0, 0, 0.4)
                `
            }}
        >
            {name}
        </div>
    </div>
);


export default function CampaignSlider({ campaigns }: CampaignSliderProps) {
    if (!campaigns || campaigns.length === 0) {
        return (
        <div className="w-full h-full rounded-lg overflow-hidden relative">
            <Image
                src="/banner.jpg"
                alt="Default banner"
                fill
                className="object-cover rounded-md"
                priority
            />
        </div>
    );

    }

    const hasMultiple = campaigns.length > 1;

    return (
        <div className="w-full h-full">
            {hasMultiple ? (
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={8}
                    slidesPerView={1}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    loop
                    className="h-full rounded-md overflow-hidden"
                >
                    {campaigns.map((campaign) => (
                        <SwiperSlide key={campaign.id}>
                            <Link href={`/campaign/${campaign.id}`}>
                                {campaign.image ? (
                                    <div className="relative w-full h-full min-h-48 md:min-h-64">
                                        <Image
                                            src={campaign.image}
                                            alt={campaign.name}
                                            fill
                                            className="object-cover rounded-md"
                                            priority
                                        />
                                        {/* <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg" /> */}
                                        {/* <div className="absolute bottom-4 left-4 text-black bg-white bg-opacity-60 px-3 py-2 rounded-md">
                    <h3 className="text-lg md:text-2xl font-bold">{campaign.name}</h3>
                    <p className="text-sm md:text-base opacity-90">{campaign.promotionCount} khuyến mãi</p>
                  </div> */}
                                    </div>

                                ) : (
                                    <div className="relative w-full h-full min-h-48 md:min-h-64">
                                        <CampaignPlaceholder name={campaign.name} />
                                    </div>
                                )}
                            </Link>
                        </SwiperSlide>

                    ))}
                </Swiper>
            ) : (
                // Chỉ 1 campaign
                <div className="h-full rounded-lg overflow-hidden relative">
                    <Link href={`/campaign/${campaigns[0].id}`}>
                    {campaigns[0].image ? (
                        <>
                            <Image
                                src={campaigns[0].image}
                                alt={campaigns[0].name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </>
                    ) : (
                        <CampaignPlaceholder name={campaigns[0].name} />
                    )}
                    </Link>
                </div>
            )}
        </div>
    );
}
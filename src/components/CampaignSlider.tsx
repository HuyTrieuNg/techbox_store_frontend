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

const CampaignPlaceholder = ({ name }: { name: string }) => (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-lg md:text-2xl font-bold h-full">
        {name}
    </div>
);

export default function CampaignSlider({ campaigns }: CampaignSliderProps) {
    if (!campaigns || campaigns.length === 0) {
        return null;
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
                                            className="object-obtain rounded-md"
                                            priority
                                        />
                                        {/* <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg" /> */}
                                        {/* <div className="absolute bottom-4 left-4 text-black bg-white bg-opacity-60 px-3 py-2 rounded-md">
                    <h3 className="text-lg md:text-2xl font-bold">{campaign.name}</h3>
                    <p className="text-sm md:text-base opacity-90">{campaign.promotionCount} khuyến mãi</p>
                  </div> */}
                                    </div>

                                ) : (
                                    <div className="h-48 md:h-64">
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
import CampaignSlider from './CampaignSlider';

const baseUrl = 'http://localhost:8080/api';

async function getActiveCampaigns() {
    try {
        const res = await fetch(`${baseUrl}/campaigns/active`, {
            next: { revalidate: 60 }
        });

        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        return [];
    }
}

export default async function CampaignSection() {
    const campaigns = await getActiveCampaigns();

    return (
        <CampaignSlider campaigns={campaigns} />
    );
}
import ProductList from "./ProductList";

const baseUrl =  (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080') + '/api';

interface ProductSectionProps {
    categoryId?: number;
    noSwiper?: boolean;
}

export default async function ProductSection({ categoryId, noSwiper }: ProductSectionProps) {
    // const res = await fetch(`${baseUrl}/products?categoryId=${categoryId}&page=0&size=10&sortBy=id&sortDirection=ASC`, {
    //     cache: "no-store",
    // });
    const query = new URLSearchParams({
        page: "0",
        size: "10",
        sortBy: "id",
        sortDirection: "ASC"
    });

    if (categoryId !== undefined) {
        query.append("categoryId", String(categoryId));
    }

    const res = await fetch(`${baseUrl}/products?${query.toString()}`, {
        cache: 'no-store'
    });

    if (!res.ok) return <div className="text-red-500">Không thể tải sản phẩm.</div>;

    const data = await res.json();

    return <ProductList products={data.content ?? []} noSwiper={noSwiper} />;
}
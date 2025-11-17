import ProductList from "./ProductList";

const baseUrl = 'http://localhost:8080/api';

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
        next: { revalidate: 60 }
    });

    if (!res.ok) return <div className="text-red-500">Không thể tải sản phẩm.</div>;

    const data = await res.json();

    return <ProductList products={data.content ?? []} noSwiper={noSwiper} />;
}